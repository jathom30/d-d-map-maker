# Header Logo Component

Header Logo is used as the default header main routing link. Think of clicking the google header or any general website header. This will be used almost every time as the navigation to the root path of the webpage i.e "https://www.google.com/search?q=example+search" -> "google.com

### Props

- `logo: string`
- `to: string`

---

## Uses

Header logo is specifically used for the main navigation in the webpages header. I.e navigate back to the main page


```tsx
<HeaderLogo logo={logo} to="/dashboard" />
```
