# Week 1 reflection

Answer each question in 1–3 sentences, in your own words.

1. What is the difference between building a UI imperatively (plain DOM code) and declaratively (React)?
Building a Ui imperatively is about writing step by steps instructions for how to change the interface. Building a Ui declaratively means defining what the UI should look like based on current data and letting the framework handle the updates.

2. Why must a component name start with a capital letter?
This is because React treats components starting with lowercase letters as native HTML tags (like <div> or <span>), whereas a capital letter tells React to treat it as a custom user-defined component.

3. What does a fragment <>...</> do, and why not just use a <div>?
It lets multiple elements to be grouped without adding an extra node to the DOM, whereas a <div> always creates a real DOM element that can disrupt CSS layouts.

4. Name one benefit of splitting the UI into small components.
It improves code reusability and maintainability by enabling to build, test, and update individual pieces of the UI independently.