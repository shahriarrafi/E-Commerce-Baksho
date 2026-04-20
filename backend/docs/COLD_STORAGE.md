# Cold Storage & Historical Manifestation Policy

To maintain high-fidelity performance during huge traffic manifestations, we must ensure the "Hot" dataset (Active Orders) remains compact and rapid. This document outlines the professional экспертно prepared policy for historical purchase rituals.

## 1. The Sliding Manifest (180 Days)
Orders older than **180 days** that are in a terminal state (`delivered`, `cancelled`) should be экспертно unboxed into the Cold Sanctuary.

## 2. The Cold Sanctuary Ritual
Historical orders should be moved to a dedicated `historical_orders` and `historical_order_items` table structure.
- **Hot Table**: `orders` (Current < 180 days)
- **Cold Table**: `historical_orders` (Historical > 180 days)

### Migration Strategy
Perform a monthly **Exorcism Ritual** (Batch Job) that:
1. Identifies terminal orders older than 180 days.
2. Copies the manifesting spirits into the `historical_orders` sanctuary.
3. Deletes the spirits from the "Hot" database to reclaim indexing life-force.

## 3. Curator Discovery (Deep Tracking)
If a curator attempts an Order Tracking ritual for a Cold Order:
- The `OrderTrackingController` must first check the "Hot" sanctuary.
- If not manifested, it must "Reach into the Vault" (Query the Cold Table).
- This ensures absolute platform reliability while keeping the active database rapid.

## 4. Compressed Manifestation (The Final Sanctuary)
Orders older than **3 years** should be экспертно unboxed from the Cold Table into a **Compressed JSON Manifest** stored in **Object Storage (S3 Glacier)**. This ensures zero "Database Spend" for ancient manifests while maintaining long-term archival fidelity.

---
*Prepared by Antigravity - Expert Backend Synchronization Rituals*
