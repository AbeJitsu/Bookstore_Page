Step 1
In this workshop, you will build a bookstore page by creating book cards that display information about different books. You'll practice organizing content using div elements, classes, and IDs.

Start by adding an h1 element with the text XYZ Bookstore.


Step 2
Below the h1 element, add a p element with this text: Browse our collection of amazing books!.

Step 3
The div element is used as a container to group other HTML elements. You will mainly use the div element when you want to group HTML elements that will share a set of CSS styles.

Below the p element, add a div element. This div will be a container for your book cards.


Step 4
The class attribute is used to identify one or more elements for styling. Unlike the id attribute, class names do not need to be unique: multiple elements can share the same class.

Here is an example:

Example Code
<p class="example">example paragraph</p>
Add a class attribute to your div element and set its value to card-container.

Step 5
Inside the element having a class of card-container, create another div element. This div will represent the first book card.

Add a class attribute to this new div element and set the value of the class attribute to card.

Step 6
The id attribute adds a unique identifier to an HTML element. Each id should be unique within a page and should only be used once.

id values cannot contain spaces and should only contain letters, digits, underscores, and dashes.

Here is an example:

Example Code
<p id="para">example paragraph</p>
Add an id attribute to your element having a class of card and set its value to sally-adventure-book.


Step 7
Inside the first element having a class of card, add an h2 element with the text Sally's SciFi Adventure.

Step 8
Below the h2 element in the first element having a class of card, add a p element with the following text:

Example Code
This is an epic story of Sally and her dog Rex as they navigate through other worlds.

Step 9
The button element is used to create clickable buttons on a webpage. Buttons are interactive elements that users can click to perform actions.

You can add multiple elements inside a div element to group related content. Add a button element inside the element that has a class of card, give the button a class attribute set to btn, and the text Buy Now.

Step 10
Now create a second book card. Add another div element with the class attribute set to card. Notice how you can reuse the same class name for multiple elements to apply consistent styling.


Step 11
Add an id attribute to your second element having a class of card and set its value to dave-cooking-book. Remember that each id must be unique.

Step 12
Inside the second element having a class of card, add an h2 element with the text Dave's Cooking Adventure.

Step 13
Below the h2 element in the second card, add a p element with this text:

Example Code
This is the story of Dave as he learns to cook everything from pancakes to pasta, one recipe at a time.

Step 14
Inside the second card, add a button element with the class attribute set to btn and the text Buy Now.

Both button elements now share the same class, which means they can be styled consistently together.

Step 15
Below the element with the class card-container, add a new p element with this text:

Example Code
Review your selections and continue to checkout.
Below the p element, create a div element with the class attribute set to btn-container. This container will group your navigation button elements.

Step 16
Inside the element with a class of btn-container, add two button elements:

First button:

Id: view-cart-btn
Class: btn
Text: View Cart
Second button:

Id: checkout-btn
Class: btn
Text: Checkout
Congratulations! You have successfully built the structure of a bookstore page using divs, classes, and ids to organize your content.