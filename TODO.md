# TODO List for Blog App Improvements

## 1. Fix Text Colors for Themes
- [x] Update CSS variables in `client/src/index.css` to use grey text on light backgrounds and white text on dark backgrounds
- [x] Change `--muted-foreground` in light mode from white to grey

## 2. Add 6 Sample Blogs
- [x] Modify `server/controllers/posts.js` to seed exactly 6 sample posts
- [x] Ensure posts have searchable content (titles, excerpts, content)

## 3. Make Search Area More Visible
- [x] Update search section in `client/src/pages/Index.jsx` to add background, border, or other visual enhancements
- [x] Ensure search input and category filter are prominently displayed

## 4. Test Search Functionality
- [ ] Verify that search works well with the 6 seeded posts
- [ ] Test filtering by title and category

## 5. Remove Dark Theme
- [x] Remove theme toggle button from navbar
- [x] Simplify ThemeContext to always use light theme
- [x] Remove dark mode CSS variables
- [x] Remove darkMode from Tailwind config
