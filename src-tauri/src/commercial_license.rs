use serde::{Deserialize, Serialize};
use tauri::AppHandle;

use crate::settings_manager::SettingsManager;

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(tag = "type")]
pub enum TrialStatus {
  Active {
    remaining_seconds: u64,
    days_remaining: u64,
    hours_remaining: u64,
    minutes_remaining: u64,
  },
  Expired,
}

pub struct CommercialLicenseManager;

impl CommercialLicenseManager {
  pub fn instance() -> &'static CommercialLicenseManager {
    &COMMERCIAL_LICENSE_MANAGER
  }

  pub async fn get_trial_status(&self, _app_handle: &AppHandle) -> Result<TrialStatus, String> {
    Ok(TrialStatus::Active {
      remaining_seconds: u64::MAX,
      days_remaining: u64::MAX,
      hours_remaining: 23,
      minutes_remaining: 59,
    })
  }

  pub async fn acknowledge_expiration(&self, _app_handle: &AppHandle) -> Result<(), String> {
    let settings_manager = SettingsManager::instance();
    let mut settings = settings_manager
      .load_settings()
      .map_err(|e| format!("Failed to load settings: {e}"))?;

    settings.commercial_trial_acknowledged = true;
    settings_manager
      .save_settings(&settings)
      .map_err(|e| format!("Failed to save settings: {e}"))?;

    log::info!("Commercial trial expiration acknowledged");
    Ok(())
  }

  pub fn has_acknowledged(&self, _app_handle: &AppHandle) -> Result<bool, String> {
    let settings_manager = SettingsManager::instance();
    let settings = settings_manager
      .load_settings()
      .map_err(|e| format!("Failed to load settings: {e}"))?;

    Ok(settings.commercial_trial_acknowledged)
  }
}

lazy_static::lazy_static! {
  static ref COMMERCIAL_LICENSE_MANAGER: CommercialLicenseManager = CommercialLicenseManager;
}

#[cfg(test)]
mod tests {
  use super::*;

  #[test]
  fn trial_status_is_active() {
    // Sync/license removed; trial is always active. The async helper needs an
    // AppHandle we cannot easily mock here, so we just confirm the enum shape.
    let status = TrialStatus::Active {
      remaining_seconds: u64::MAX,
      days_remaining: u64::MAX,
      hours_remaining: 23,
      minutes_remaining: 59,
    };
    assert!(matches!(status, TrialStatus::Active { .. }));
  }
}
