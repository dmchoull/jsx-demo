/** @jsx h **/

function Button({ onClick, label }) {
  return <button onClick={onClick}>{label}</button>;
}

const App = () => (
  <div id="container">
    <h1
      id="title"
      style={{
        color: "#942525",
        backgroundColor: "#e3e3e3",
      }}
    >
      Hello, JSX!
    </h1>
    <hr />
    <Button onClick={() => console.log("Hello")} label="Try me!" />
  </div>
);

render(<App />, document.getElementById("app"));

/**
 * Creates a virtual DOM element
 *
 * @param tagName
 * @param attributes
 * @param children
 * @returns {{children: *[], attributes: *, tagName: *}|*}
 */
function h(tagName, attributes, ...children) {
  if (typeof tagName === "function") {
    return tagName(attributes);
  }
  return { tagName, attributes, children };
}

/**
 * Converts a virtual DOM element created by the h function into an actual
 * HTMLElement and appends it to the given container element
 *
 * @param element
 * @param container
 * @returns {HTMLElement}
 */
function render(element, container) {
  const domElement = document.createElement(element.tagName);

  setAttributes(domElement, element.attributes);

  appendChildren(domElement, element.children);

  if (container) {
    container.appendChild(domElement);
  }

  return domElement;
}

/**
 * Apply attributes to the DOM element
 *
 * @param domElement
 * @param attributes
 */
function setAttributes(domElement, attributes) {
  for (const name in attributes) {
    if (!attributes.hasOwnProperty(name)) {
      return;
    }

    const value = attributes[name];

    if (name === "style") {
      setStyles(domElement, value);
    } else if (name === "onClick") {
      domElement.onclick = value;
    } else {
      domElement.setAttribute(name, value);
    }
  }
}

/**
 * Apply styles to the DOM element styles property
 *
 * @param domElement
 * @param styles
 */
function setStyles(domElement, styles) {
  for (const rule in styles) {
    if (styles.hasOwnProperty(rule)) {
      domElement.style[rule] = styles[rule];
    }
  }
}

/**
 * Render and append all children to this DOM element
 *
 * @param domElement
 * @param children
 */
function appendChildren(domElement, children) {
  children.forEach((child) => {
    if (typeof child === "string") {
      domElement.appendChild(document.createTextNode(child));
    } else {
      render(child, domElement);
    }
  });
}
