# Tracking Setup Checklist (GTM, GA4 & Meta Pixel)

This document contains the step-by-step TODO list to complete the tracking setup in [Google Tag Manager](https://tagmanager.google.com).

---

## 0. Current Implementation in Code (Completed)
The SvelteKit code is already pushing all events and parameters to the `dataLayer`:

- [x] **`view_item`** &rarr; Triggered in `Detail.svelte` when an offer is viewed (`item_id`, `item_name`, `item_category`, `city`).
- [x] **`search`** &rarr; Triggered in `Catalog.svelte` on city chip filter and debounced text search (`search_term`).
- [x] **`contact_form_open`** &rarr; Triggered in `Detail.svelte` when the user clicks the "Aplikuj" button (`item_id`, `item_name`, `item_category`, `city`).
- [x] **`generate_lead`** &rarr; Triggered in `Apply.svelte` when the application form is submitted (`offerId`, `jobType`, `location`).
- [x] **`share`** &rarr; Triggered in `Detail.svelte` / `ShareButton.svelte` on native share or copy link (`method`, `content_type`, `item_id`).
- [x] **GTM Container Snippet** &rarr; Embedded in `src/app.html`.

---

## 1. GTM Data Layer Variables
In GTM: **Variables** &rarr; **User-Defined Variables** &rarr; **New** &rarr; **Data Layer Variable**.

- [ ] **`DLV - search_term`**
  - Variable Name: `search_term`
- [ ] **`DLV - item_id`**
  - Variable Name: `item_id`
- [ ] **`DLV - item_name`**
  - Variable Name: `item_name`
- [ ] **`DLV - item_category`**
  - Variable Name: `item_category`
- [ ] **`DLV - offerId`**
  - Variable Name: `offerId`

---

## 2. GTM Custom Event Triggers
In GTM: **Triggers** &rarr; **New** &rarr; **Custom Event**.

- [x] **`Event - generate_lead`**
  - Event Name: `generate_lead` *(Already working)*
- [ ] **`Event - view_item`**
  - Event Name: `view_item`
- [ ] **`Event - search`**
  - Event Name: `search`
- [ ] **`Event - contact_form_open`**
  - Event Name: `contact_form_open`
- [ ] **`Event - share`**
  - Event Name: `share`

---

## 3. Google Analytics 4 Tags
In GTM: **Tags** &rarr; **New** &rarr; **Google Analytics: GA4 Event**.
*(Use your GA4 Measurement ID `G-XXXXXXXX`)*

- [x] **`GA4 - generate_lead`** *(Already working)*
  - Event Name: `generate_lead`
  - Trigger: `Event - generate_lead`
- [ ] **`GA4 - view_item`**
  - Event Name: `view_item`
  - Event Parameters:
    - `item_id` &rarr; `{{DLV - item_id}}`
    - `item_name` &rarr; `{{DLV - item_name}}`
    - `item_category` &rarr; `{{DLV - item_category}}`
  - Trigger: `Event - view_item`
- [ ] **`GA4 - search`**
  - Event Name: `search`
  - Event Parameters:
    - `search_term` &rarr; `{{DLV - search_term}}`
  - Trigger: `Event - search`
- [ ] **`GA4 - contact_form_open`**
  - Event Name: `contact_form_open`
  - Event Parameters:
    - `item_id` &rarr; `{{DLV - item_id}}`
  - Trigger: `Event - contact_form_open`
- [ ] **`GA4 - share`**
  - Event Name: `share`
  - Event Parameters:
    - `item_id` &rarr; `{{DLV - item_id}}`
  - Trigger: `Event - share`

---

## 4. Meta (Facebook) Pixel Tags
In GTM: **Tags** &rarr; **New** &rarr; **Custom HTML**.
*(Replace `YOUR_PIXEL_ID` with your actual Meta Pixel ID)*

- [ ] **`Meta - Base Pixel (PageView)`**
  - HTML:
    ```html
    <script>
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', 'YOUR_PIXEL_ID');
      fbq('track', 'PageView');
    </script>
    <noscript><img height="1" width="1" style="display:none"
      src="https://www.facebook.com/tr?id=YOUR_PIXEL_ID&ev=PageView&noscript=1"
    /></noscript>
    ```
  - Trigger: **Initialization - All Pages** (or **All Pages**)

- [ ] **`Meta - Lead`**
  - HTML:
    ```html
    <script>
      fbq('track', 'Lead');
    </script>
    ```
  - Trigger: `Event - generate_lead`

- [ ] **`Meta - ViewContent`**
  - HTML:
    ```html
    <script>
      fbq('track', 'ViewContent', {
        content_name: '{{DLV - item_name}}',
        content_ids: ['{{DLV - item_id}}'],
        content_type: 'product'
      });
    </script>
    ```
  - Trigger: `Event - view_item`

- [ ] **`Meta - Search`**
  - HTML:
    ```html
    <script>
      fbq('track', 'Search', {
        search_string: '{{DLV - search_term}}'
      });
    </script>
    ```
  - Trigger: `Event - search`

- [ ] **`Meta - InitiateCheckout`**
  - HTML:
    ```html
    <script>
      fbq('track', 'InitiateCheckout');
    </script>
    ```
  - Trigger: `Event - contact_form_open`

---

## 5. Testing & Publishing
- [ ] Run **Preview** in GTM and verify each tag fires on the Tag Assistant timeline.
- [ ] Check Chrome extension **Meta Pixel Helper** to verify Meta events show green checkmarks.
- [ ] Click **Submit** &rarr; **Publish** in GTM to make all tags live.
