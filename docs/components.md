---
id: components
title: Components
---

In our application, view is separated into two different entities. One is called components and another is container. Because components are much easier to reuse.

My presentational components:

- Are concerned with how things look.
- May contain both presentational and container components\*\* inside, and usually have some DOM markup and styles of their own.
- Often allow containment via this.props.children.
- Have no dependencies on the rest of the app, such as Flux actions or stores.
- Don’t specify how the data is loaded or mutated.
- Receive data and callbacks exclusively via props.
- Rarely have their own state (when they do, it’s UI state rather than data).
- Are written as functional components unless they need state, lifecycle hooks, or performance optimizations.
- Examples: Page, Sidebar, Story, UserInfo, List.


## Benefits of This Approach

- Better separation of concerns. You understand your app and your UI better by writing components this way.
- Better reusability. You can use the same presentational component with completely different state sources, and turn those into separate container components that can be further reused.
- Presentational components are essentially your app’s “palette”. You can put them on a single page and let the designer tweak all their variations without touching the app’s logic. You can run screenshot regression tests on that page.
- This forces you to extract “layout components” such as Sidebar, Page, ContextMenu and use this.props.children instead of duplicating the same markup and layout in several container components.


## Example

// CommentListContainer.js

```js
import React from "react";
import CommentList from "./CommentList";

class CommentListContainer extends React.Component {
  constructor() {
    super();
    this.state = { comments: [] };
  }

  componentDidMount() {
    fetch("/my-comments.json")
      .then(res => res.json())
      .then(comments => this.setState({ comments }));
  }

  render() {
    return <CommentList comments={this.state.comments} />;
  }
}
```

// CommentList.js

```js
import React from "react";

const Commentlist = comments => (
  <ul>
    {comments.map(({ body, author }) => (
      <li>
        {body}-{author}
      </li>
    ))}
  </ul>
);
```
