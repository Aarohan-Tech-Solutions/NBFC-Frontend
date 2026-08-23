export enum VerificationCategory {
  KYC = "kyc",
  DOCUMENT = "document",
  BANK = "bank",
  PROPERTY = "property",
  GUARANTOR = "guarantor",
}

export enum VerificationStatus {
  PENDING = "pending",
  IN_PROGRESS = "in_progress",
  VERIFIED = "verified",
  REJECTED = "rejected",
  MORE_INFO_REQUIRED = "more_info_required",
}
