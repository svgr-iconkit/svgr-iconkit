# `@svgr-iconkit/tabler-icons`

Icons re-exported from [tabler-icons](https://tabler-icons.io/).

Full details please check on website https://svgr-iconkit.dev/explorer/tabler-icons.

## Usage

### React Web

```javascript
import Icon from '@svgr-iconkit/tabler-icons';

export default function App() {
  return <div><Icon name="books" /></div>
}

```

### React Native

```javascript
import { View } from "react-native";
import Icon from '@svgr-iconkit/tabler-icons';

export default function App() {
  return <View><Icon name="books" /></View>
}

```


### Individual loading

```javascript
import { View } from "react-native";
import Icon from '@svgr-iconkit/core';
import BooksIconContent from '@svgr-iconkit/tabler-icons/icons/regular/books';

export default function App() {
  return <View><Icon content={BooksIconContent} /></View>
}

```
