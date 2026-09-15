# Implementation Plan

This plan replaces the previous staged order-workflow proposal. The public Astro site and the on-prem service will remain separate deployments in this repository.

## Scope And Sequence

### 1. Demo The Future Landing Page At `/home/`

- Build the owner-demo landing page at `/home/` while `/` keeps the current live work-in-progress page.
- Keep `/home/` out of the sitemap and marked `noindex` during the demo period.
- Use approved copy, real bake photography, and the public-site SEO and accessibility rules.
- When the owner approves the demo, move its content to `/` and redirect `/home/` to `/`.

**Done when:** the owner approves the landing-page content and the responsive, accessible demo is ready to promote.

### 2. Build The `/menu/` WhatsApp Order Flow

- Build the customer-facing menu from one approved product-data source.
- Let customers select items, quantities, and approved options, then collect their name, contact, requested delivery date, time window, and address.
- Make the UI clear that availability, delivery fee, final price, and acceptance require owner confirmation.
- Generate one encoded WhatsApp message with the selected items and delivery details. WhatsApp handles customisation questions and exceptions in this stage.
- Keep this phase browser-only: no server-side storage, payment, or customer account.
- Use native controls, keyboard-accessible quantity controls, and client-side validation only as a usability aid.

**Done when:** the owner approves the product selection, delivery-detail fields, validation, WhatsApp message, and customer-facing wording.

### 3. Add API-Backed Intake And The Owner Dashboard

- Define the request and response contract from the approved `/menu/` UI before writing the service.
- Implement the API in the on-prem service at `admin.perlettecakes.com/api` and change `/menu/` to submit requests directly from the browser.
- Validate and rate-protect every public request on the server. The browser cannot set final prices, payment status, or order acceptance.
- Create the private owner dashboard Amira needs to review incoming requests. WhatsApp remains optional for questions and exceptions, not the system of record.
- Establish privacy, retention, backup, and operational rules before storing customer contact or delivery data.

**Done when:** a `/menu/` submission creates one reviewable order request, retries are safe, and Amira can access it only through the private dashboard.

### 4. Add Payment And Fulfilment Integrations

- Let the owner review feasibility, capacity, final price, delivery fee, and terms before any payment request is created.
- Create Stripe payment flows and verify Stripe webhooks only in the on-prem service.
- Send transactional email and request Lalamove information only from the on-prem service.
- Keep provider credentials server-only and do not automate order acceptance or delivery booking without an owner-approved operating flow.

**Done when:** the full checkout and fulfilment workflow is finalized with the owner and each external integration is separately tested after the intake and dashboard flow has proven reliable.

## Deferred

- Customer accounts, self-service order changes, automated delivery booking, and new public routes are outside the current plan.
