# AngularExerciseNikola

Example project done as an Angular Exercise. 
Developed with:
- **Node.js:** v22.18.0  
- **Angular CLI:** 20.3.11 

## Setup Instructions

### Install Dependencies

```bash
npm install
```

### Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## General insights
The project uses the modern Angular 17+ standalone architecture:
- No NgModules
- Standalone components
- Better tree-shaking
- Cleaner file structure
- Lazy-loading and performance considered

## Assumptions Made
- Pokemon endpoint always returns valid images for the supported IDs.
- Pagination is performed server-side.
- Responsive breakpoints based on typical device widths.
- No additional backend is required for this exercise.

## Trade offs

### 1. Extracting Pokemon ID from URL
The Pokemon list endpoint (`/pokemon?limit=X&offset=Y`) does **not** include a direct `id` field.  
Each entry contains only:

```json
{ 
  "name": "bulbasaur",
  "url": "https://pokeapi.co/api/v2/pokemon/1/"
}
```
This could lead to an issues and complete app crash later on, If this url got changed from the api later.
I am extracting it from the url now - which **does work**, but it's not a bullet proof solution.
**Instead id should be returned as part of this rest api**

### 2. Signals
I am using explicit signal-driven state model (`entries`, `loading`, `error`, `offset`) instead of a reactive `toSignal()` RxJS pipeline.

**Pros**
- Clearer and more maintainable  
- Ideal for pagination and interactive pages  
- Easy to debug

**Cons**
- Slightly more verbose  
- Requires explicit load methods (`loadPage()`, etc. later on if pagination is added)


### 3. CSS Skeleton and Lazy Loading
Instead of using `@defer` for each thumbnail, I use a CSS-based skeleton shimmer animation until the `<img>` load event fires up.
`@defer` is being used in the main parent component to avoid manage of the loading logic per image component and avoid multiple defers instead of one clear control point.
You can see how this performs with more objects by changing the value in the **trainer-hub.component.ts** as:
readonly **pageSize** = signal(**8**) to some greater number like 100 or 300.

**Pros**
- Bullet proof behavior  
- No viewport timing issues  
- Smooth fade-in  
- Works even if the image fails  

**Cons**
- Slightly more CSS  
- Requires one small signal per card

### 4. Mobile design and figma editing
Mobile design was not provided. I've sorted this, based on the best practices.
Font sizes were not editable or showing the values (I did not had edit permissions) so I have aligned them visually to match the figma design - both for desktop and mobile.

## Time spent
3 hours
