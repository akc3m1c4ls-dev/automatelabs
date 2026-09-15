# AUTOMATELABS WEBSITE IMPLEMENTATION

## 1. AUDIT THE EXISTING PROJECT FIRST

Before making changes, inspect the existing project thoroughly.

Read and understand:

* HTML
* CSS
* JavaScript / TypeScript
* configuration files
* README/documentation
* assets
* existing components
* existing routes/pages
* existing functionality
* current project structure
* current frontend/backend stack

Identify:

* what already works
* what is incomplete
* temporary implementations
* errors
* duplicated code
* weak architecture
* existing design patterns
* existing useful components
* existing functionality that can be improved rather than replaced

Do not blindly rebuild the entire project from scratch.

Existing functionality should be preserved where useful and improved where necessary.

If a feature works but looks poor, improve it.

If a feature is partially implemented, finish it.

If the UX is weak, redesign it.

If the implementation is unnecessarily weak or messy, refactor it.

If something is already useful and fits the new direction, preserve it.

The goal is to evolve the existing project into the final AutomateLabs website rather than unnecessarily destroying and recreating it.

---

# 2. AUTOMATELABS POSITIONING

AutomateLabs creates clear digital products that help people and businesses:

* save time
* reduce repetitive work
* improve workflows
* make work more convenient
* improve customer experience
* unlock useful digital capabilities

The target audience is broad:

* individuals
* professionals
* freelancers
* small business owners
* entrepreneurs
* companies

The visitor does not need to understand technology.

The website must sell the **result and convenience**, not technical complexity.

Communicate:

* saved time
* simplicity
* convenience
* better workflows
* productivity
* easier customer interactions
* reduced repetitive work
* better user experience
* new possibilities

AutomateLabs should feel:

* serious
* trustworthy
* professional
* approachable
* modern
* useful

Do not position AutomateLabs as an "engineering website" or an engineering company.

Avoid making the website feel like a technical portfolio.

The visitor should immediately understand that AutomateLabs provides useful digital products that they can actually use or order.

---

# 3. PRODUCTS

AutomateLabs has five product/solution paths:

1. Online Booking
2. AI Chatbot
3. Routine Task Automation
4. Website Upgrade
5. Custom

The first four are predefined products.

They should feel like clear products that a customer can understand and order.

Custom is a separate path for customers whose needs do not fit one of the predefined products.

Do not present the four products as abstract consulting services.

---

# 4. AUTOMATION POSITIONING

Do not position automation primarily as a way to replace employees.

The core message is:

**Automation helps people work more effectively.**

Emphasize:

* productivity
* saved time
* reduced repetitive work
* better workflows
* helping employees
* making work easier
* allowing people to focus on work that actually requires people

Avoid messaging focused on:

* layoffs
* staff reduction
* replacing humans
* eliminating jobs

Automation should feel like a tool that empowers people.

The customer remains in control.

Where appropriate, customers should be able to configure, control, modify, pause, or adjust the automation.

---

# 5. LANGUAGES

The website must support:

* EN
* RUS
* EE

The default language is English.

Place a language selector on the right side of the navbar:

**EN | RUS | EE**

Language switching must actually work.

Do not make the language selector decorative.

Use a centralized localization structure rather than duplicating the entire website unnecessarily for every language.

All important user-facing content should be localizable.

---

# 6. HERO: THE 3-SECOND RULE

Within approximately three seconds, a visitor should understand:

1. What AutomateLabs does
2. What it can do for them
3. What they can do next

The hero must work even for someone who is not technical and is not deeply interested in automation.

Use concrete human value rather than abstract technology language.

For example, consider a tattoo artist who currently receives bookings through Instagram DMs.

They may initially think:

"I prefer talking to my customers. I have nothing to automate."

The website should demonstrate that an Online Booking product does not remove personal interaction.

Instead:

* customers can choose a service
* customers can choose an available time
* customers can confirm the appointment
* the specialist can continue working
* repetitive scheduling messages are reduced
* personal communication can still remain

Use concrete scenarios like this to communicate value.

---

# 7. HERO COPY

Do not use generic corporate phrases such as:

"Next-generation digital transformation solutions"

"Innovative technology for modern businesses"

"Engineering the future"

Avoid corporate filler.

Use a short, human, memorable hook.

Possible directions:

* "Let your website do the busy work."
* "Less routine. More time for what matters."
* "Turn repetitive work into something that just happens."

Choose the strongest final wording based on the overall design and product positioning.

The copy should feel natural, confident and useful.

---

# 8. HERO CTA

The main hero CTA must be a clear commercial/action-oriented CTA.

Do not use vague CTAs such as:

"Learn More"

Possible directions:

* Explore Products
* Build Yours
* Get Started

Choose the CTA that best fits the implemented experience.

A secondary CTA may be used if it genuinely improves the user journey.

---

# 9. HERO VISUAL

The hero visual should show a real product result rather than abstract technology.

Prefer an actual interface or product experience.

Online Booking is a strong example:

**Service → Date → Time → Confirmation**

The visitor should be able to visually understand what the product does.

Avoid using abstract 3D technology objects as the primary explanation of the product.

---

# 10. VISUAL DIRECTION

The visual style should feel:

* modern
* serious
* professional
* premium
* friendly
* calm
* technological
* easy to understand
* trustworthy

Do NOT make the website:

* hacker-themed
* cyberpunk
* excessively neon
* covered in glowing effects
* dependent on aggressive gradients
* filled with grids
* terminal-themed
* sci-fi themed
* dependent on decorative 3D objects

Prefer a relaxing technology palette such as:

* soft dark tones
* muted blue
* soft cyan
* sage
* desaturated green
* warm white
* subtle lavender
* gentle gradients
* soft shadows

The overall feeling should be:

**Modern technology that feels pleasant to use.**

---

# 11. MOBILE DESIGN

Mobile is mandatory.

Do not simply scale the desktop design down.

The mobile layout must be intentionally designed for small screens and touch interaction.

Adapt:

* content
* layout
* hierarchy
* interaction
* typography
* spacing
* buttons
* navigation
* product cards
* product visuals

On mobile, it is acceptable to:

* shorten copy
* remove secondary information
* change composition
* reduce visible elements
* simplify visuals

Do not make users endlessly swipe vertically just to finish reading a single product card.

The mobile experience should remain:

* clean
* professional
* easy to understand
* fast to navigate
* comfortable on small Android devices

There must be no horizontal overflow.

---

# 12. PRODUCTS SECTION

The existing "Services" section should become:

**Products**

Do not use a conventional four-card grid.

Create a central product showcase/carousel.

The center product should be:

* larger
* brighter
* in the foreground
* visually dominant

It should contain concise but complete information and a large product mockup/visual.

The neighboring products should appear:

* smaller
* darker
* further away
* partially hidden where appropriate
* visually behind the center product

Provide:

**← →**

navigation arrows.

Transitions should feel smooth and create a subtle sense of depth.

The carousel should feel like browsing actual products rather than flipping through generic marketing cards.

---

# 13. ONLINE BOOKING

Online Booking should be the default center product when the page loads.

It is chosen because it provides the broadest and fastest understanding of the AutomateLabs concept.

The main scenario:

**Customer chooses service → chooses time → confirms booking**

Communicate benefits such as:

* fewer scheduling messages
* less manual scheduling
* convenient customer booking
* clear appointment management
* professional presentation
* personal communication can remain

The business owner should be able to control things such as:

* services
* available times
* schedule
* booking rules
* settings

The system automates the routine while the person remains in control.

The product must have:

**Order**

and

**Learn More**

buttons.

---

# 14. AI CHATBOT

The AI Chatbot must feel practical rather than magical.

It can:

* answer FAQs
* help visitors
* explain services
* guide users
* capture inquiries
* reduce repetitive questions

Show a realistic conversation interface.

Do not make exaggerated claims about AI.

The AI handles routine questions while the business owner remains in control.

The product must have:

**Order**

and

**Learn More**

buttons.

---

# 15. ROUTINE TASK AUTOMATION + WEBSITE UPGRADE

## Routine Task Automation

Position this as a productivity product.

Core idea:

**Let the system handle repetitive work so people can focus on work that actually needs people.**

Examples can include:

* data processing
* notifications
* repetitive actions
* information transfer
* document workflows
* integrations

Sell:

* time
* productivity
* convenience
* workflow improvement

Do not sell fear of job loss.

The product must have:

**Order**

and

**Learn More**

buttons.

## Website Upgrade

Position this for outdated or poorly functioning websites.

Core message:

**Your website can look modern, work better, and feel great on a phone.**

Show:

**Old Website → Modern Website**

Demonstrate:

* modern design
* mobile friendliness
* improved UX
* clearer structure
* modern visual presentation

The product must have:

**Order**

and

**Learn More**

buttons.

---

# 16. PRODUCT UX, ORDER AND LEARN MORE

Users should quickly understand whether a product is relevant to them and have an immediate opportunity to purchase or learn more.

Every predefined product must have two primary actions:

**Order**

and

**Learn More**

## Order

Order is the direct purchase path.

Flow:

**Order → Cart → Checkout → Payment**

When the user presses Order:

* immediately add the selected product to the cart
* do not force the user through a contact form first if enough information already exists
* do not make the user select the product again
* clearly show what is being purchased

## Learn More

Learn More is the exploration path.

Each product must have a dedicated landing page.

Examples:

**Online Booking → Learn More → Online Booking landing page**

The dedicated page can explain:

* how the product works
* use cases
* benefits
* interface
* features
* user controls
* what is included
* customization
* pricing/options
* purchasing

Do not overload the main carousel with this information.

## Custom Solutions

Custom should NOT be another product inside the main four-product carousel.

It should be a separate section immediately after Products, approximately one scroll away.

Concept:

**Need something different? Tell us what you need and we'll figure it out.**

Use a clear:

**Custom Solution**

CTA.

Do not implement a complicated custom-solution flow unless useful functionality already exists.

The main relationship should be:

**Products → Custom Solutions**

The custom section will be developed further separately.

---

# 17. PRODUCT LANDING PAGES

Each main product must have its own dedicated landing page:

1. Online Booking
2. AI Chatbot
3. Routine Task Automation
4. Website Upgrade
5. Custom

The first four are ready-made products.

Custom is the fifth product/solution path for customers who need something tailored rather than one of the predefined products.

## General Structure

Do not use a generic:

**Hero → Problem → Solution**

structure.

Different businesses have very different situations, so do not assume or describe a universal customer problem.

Instead, focus the landing pages on:

**Product → Value → How It Works → Integration → Product Experience → Customization → Purchase**

The exact structure can vary between products where appropriate.

## Product Hero

Immediately communicate:

* what the product is
* what it provides
* who it is useful for
* the value of having it
* a clear visual representation of the product

Use:

* strong concise headline
* short supporting text
* realistic product visual
* prominent Order CTA

The visitor should understand the product and its value without needing to dig through large amounts of text.

## Value & Benefits

Focus on what the customer gains from using the product.

Emphasize things such as:

* saved time
* less repetitive work
* easier workflows
* better customer experience
* more convenient operations
* greater productivity
* professional presentation
* flexibility and control

Do not manufacture a specific "business problem" for the customer.

Explain why the product is valuable and let the customer recognize where it fits their own situation.

## Integration With the Business

Explain how the product becomes part of the customer's existing workflow.

Show practical integration concepts such as:

* where the product is used
* what information flows into and out of it
* how it interacts with existing websites, tools, or workflows
* what happens automatically
* what the customer still controls
* how the product fits into day-to-day work

Use diagrams, interface examples, workflow visualizations, or other clear visual methods where useful.

The goal is to make the integration feel:

* real
* understandable
* achievable

Do not present the product as an abstract service.

## Product Experience / Dedicated GUI

Product previews should feel like actual products, not generic marketing illustrations.

Where appropriate, present a dedicated application/interface with a polished GUI demonstrating what using the product could actually look like.

Examples:

### Online Booking

Show:

**Service → Date → Time → Confirmation**

Also show a possible management dashboard with:

* appointments
* services
* availability
* settings

### AI Chatbot

Show an actual chatbot interface with realistic conversations and controls.

### Routine Task Automation

Show an automation dashboard containing:

* workflows
* triggers
* actions
* execution status

### Website Upgrade

Show the:

**Before → After**

website experience.

### Custom

Show an example of a tailored interface or workflow while making it clear that the final solution is built around the customer's requirements.

The interface should look like something the customer could genuinely use.

## Customizability

Make customization a major selling point.

Communicate that products are not rigid one-size-fits-all packages.

Where applicable, customers can configure:

* appearance
* services
* workflows
* rules
* availability
* content
* integrations
* automation behavior
* user experience
* business-specific requirements

Show customization visually whenever possible rather than only describing it in text.

The message should be:

**The product adapts to the business, not the other way around.**

## Maintain User Control

For automation-based products, clearly communicate that the customer remains in control.

Show that they can configure, manage, modify, pause, or adjust the system where appropriate.

Automation should feel like an empowering tool that works alongside people, not something that takes control away from them.

## Purchase CTA

The Order action should remain clear throughout the landing page.

The purchase flow remains:

**Order → Cart → Checkout → Payment**

The customer should always know exactly which product they are purchasing.

Additional Order CTAs can appear naturally throughout the page when they help move the visitor toward purchasing.

## FAQ

Do NOT make a large traditional FAQ section a required part of every product page.

Do not add an FAQ simply because landing pages traditionally have one.

Most visitors will not read a wall of frequently asked questions before deciding whether they are interested.

Instead, answer important questions where they naturally arise.

For example:

* How does it work? → Integration section
* Can I customize it? → Customization section
* What do I get? → Product/value section
* Can I control it? → User Control section
* How much does it cost? → Pricing/purchase section

If a small FAQ is genuinely useful for a particular product, it may be included.

## Mobile

Every product landing page must be designed specifically for mobile.

Prioritize:

* clear product value
* product visuals
* easy-to-understand interfaces
* short readable sections
* customization
* integration
* easily accessible Order CTA

Avoid excessive vertical scrolling and unnecessary copy.

The mobile version should communicate the same value efficiently rather than simply stacking the desktop layout.

---

# IMPLEMENTATION PRINCIPLES

Do not merely describe the implementation.

Actually implement the requirements in the existing project.

Inspect the current codebase before making architectural decisions.

Reuse existing functionality where appropriate.

Build reusable components where they make sense.

Keep product information structured so products, translations, pricing and content can be maintained without duplicating large amounts of code.

Do not create unnecessary complexity just to satisfy the specification.

Prioritize:

1. Functional behavior
2. Clear UX
3. Responsive design
4. Visual quality
5. Maintainable architecture
6. Performance

After implementing changes:

* run the project
* verify the main page
* verify navigation
* verify language switching
* verify the product carousel
* verify product landing pages
* verify Order behavior
* verify cart behavior if already implemented
* verify responsive behavior
* inspect for console errors
* fix implementation errors you discover

Do not stop at generating code.

Continue until the implemented result is coherent and functional.

If an existing feature conflicts with these requirements, determine whether it should be adapted, replaced, or removed based on the overall goal rather than blindly preserving it.

When something is unclear, prefer a reasonable implementation based on the surrounding requirements instead of stopping unnecessarily.

Do not ask for confirmation for every small design or implementation decision.

Make reasonable decisions, implement them, test them, and continue.
