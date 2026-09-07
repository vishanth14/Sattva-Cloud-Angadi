# Sattva Cloud Angadi - System Flowchart

## High-Level Architecture

```mermaid
graph TB
    subgraph "Client Browser"
        A[React 19 App] --> B[React Router v7]
        B --> C[Context Providers]
        
        subgraph "Context Layer"
            C --> D[AuthContext]
            C --> E[CartContext]
            C --> F[WishlistContext]
        end
        
        subgraph "UI Components"
            G[Layout: Navbar, Footer]
            H[Pages: Home, Materials, Products, etc.]
            I[Effects: ParticleNetwork, FluidCursorBlob, WebGL]
            J[Common: CustomCursor, LoadingScreen]
        end
        
        B --> G
        B --> H
        A --> I
        A --> J
    end
    
    subgraph "Data Layer (Static)"
        K[data/*.ts]
        K --> L[materials.ts]
        K --> M[products.ts]
        K --> N[artisans.ts]
        K --> O[rituals.ts]
        K --> P[roots.ts]
        K --> Q[timelines.ts]
        K --> R[careGuides.ts]
    end
    
    subgraph "Persistence (localStorage)"
        S[sattva_user]
        T[sattva_users]
        U[sattva_cart]
        V[sattva_wishlist]
    end
    
    D --> S
    D --> T
    E --> U
    F --> V
    
    H --> K
```

## Routing Flow

```mermaid
flowchart TD
    A[App Entry] --> B[AuthProvider]
    B --> C[CartProvider]
    C --> D[WishlistProvider]
    D --> E[RouterProvider]
    
    E --> F{Root Layout}
    F --> G[Navbar]
    F --> H[Outlet]
    F --> I{Footer?}
    I -->|No| J[Login/Register/Roots]
    I -->|Yes| K[Other Pages]
    
    H --> L[Route Matching]
    L --> M[/ -> Home]
    L --> N[/materials -> Materials]
    L --> O[/materials/:slug -> MaterialDetail]
    L --> P[/products -> Products]
    L --> Q[/products/:slug -> ProductDetail]
    L --> R[/artisans -> Artisans]
    L --> S[/artisans/:id -> Artisans]
    L --> T[/rituals -> Rituals]
    L --> U[/rituals/:id -> Rituals]
    L --> V[/roots -> Roots]
    L --> W[/cart -> Cart]
    L --> X[/checkout -> Checkout]
    L --> Y[/login -> Login]
    L --> Z[/register -> Register]
    L --> AA[/account -> Account]
    L --> AB[* -> NotFound]
```

## User Journey Flows

### Browse & Discovery Flow
```mermaid
flowchart TD
    A[Landing on Home] --> B[Hero Section]
    B --> C[Philosophy Section]
    C --> D[WebGL Interactive Showcase]
    D --> E[Material Showcase Grid]
    E --> F[Featured Journey Steps]
    
    F --> G{User Action}
    G -->|Click Material| H[/materials/:slug]
    G -->|Click Product| I[/products/:slug]
    G -->|Explore Materials| J[/materials]
    G -->|Explore Products| K[/products]
    G -->|Begin Journey| J
    
    H --> L[MaterialDetail Page]
    L --> M[View Timeline]
    L --> N[View Products by Material]
    L --> O[Related Rituals]
    
    I --> P[ProductDetail Page]
    P --> Q[Add to Cart]
    P --> R[Add to Wishlist]
    P --> S[View Care Guide]
    P --> T[View Related Rituals]
```

### Shopping Flow
```mermaid
flowchart TD
    A[ProductDetail] --> B[Add to Cart]
    B --> C[CartContext.addItem]
    C --> D[Update localStorage]
    D --> E[Show Toast/Animation]
    
    E --> F{Continue Shopping?}
    F -->|Yes| G[Back to Products/Materials]
    F -->|No| H[Go to Cart]
    
    H --> I[Cart Page]
    I --> J[Review Items]
    J --> K[Update Quantity]
    K --> L[Remove Items]
    L --> M[Proceed to Checkout]
    
    M --> N{Logged In?}
    N -->|No| O[Login/Register Redirect]
    N -->|Yes| P[Checkout Page]
    
    O --> Q[Auth Flow]
    Q --> P
    
    P --> R[Fill Address]
    R --> S[Place Order]
    S --> T[AuthContext.addOrder]
    T --> U[CartContext.clearCart]
    U --> V[Order Confirmation]
    V --> W[/account]
```

### Authentication Flow
```mermaid
flowchart TD
    A[User Clicks Login/Register] --> B[/login or /register]
    B --> C[Form Submission]
    C --> D{AuthContext Method}
    D -->|Login| E[Find User in localStorage]
    D -->|Register| F[Check Email Exists]
    
    E --> G{Credentials Match?}
    G -->|Yes| H[Set User State]
    G -->|No| I[Show Error]
    
    F --> J{Email Available?}
    J -->|Yes| K[Create New User]
    J -->|No| I
    
    K --> H
    H --> L[Save to localStorage]
    L --> M[Redirect to Previous Page]
    
    M --> N[Navbar Updates]
    N --> O[Account Page Accessible]
```

### Wishlist Flow
```mermaid
flowchart TD
    A[ProductDetail/Products] --> B[Click Heart Icon]
    B --> C[WishlistContext.toggle]
    C --> D{Already in Wishlist?}
    D -->|Yes| E[Remove from Wishlist]
    D -->|No| F[Add to Wishlist]
    E --> G[Update localStorage]
    F --> G
    G --> H[UI Updates]
    
    H --> I[Wishlist Count in Navbar]
    I --> J[User Visits Account]
    J --> K[View Wishlist Items]
    K --> L[Move to Cart]
    L --> M[WishlistContext.moveToCart]
    M --> N[CartContext.addItem]
    N --> O[Remove from Wishlist]
```

## Data Flow Summary

```mermaid
flowchart LR
    subgraph "Static Data"
        SD[data/*.ts] -->|Import| P[Pages/Components]
    end
    
    subgraph "Runtime State"
        P -->|Read/Write| Auth[AuthContext]
        P -->|Read/Write| Cart[CartContext]
        P -->|Read/Write| Wish[WishlistContext]
    end
    
    subgraph "Persistence"
        Auth -->|localStorage| LS1[sattva_user, sattva_users]
        Cart -->|localStorage| LS2[sattva_cart]
        Wish -->|localStorage| LS3[sattva_wishlist]
    end
    
    subgraph "Effects Layer"
        EL[ParticleNetwork, FluidCursorBlob, WebGLImageReveal, InteractiveImageMask] -.->|Visual Only| P
    end
```

## Component Hierarchy

```mermaid
graph TD
    App[App.tsx]
    App --> AuthP[AuthProvider]
    AuthP --> CartP[CartProvider]
    CartP --> WishP[WishlistProvider]
    WishP --> Effects[Global Effects]
    Effects --> PN[ParticleNetwork]
    Effects --> FCB[FluidCursorBlob]
    Effects --> CC[CustomCursor]
    WishP --> LS[LoadingScreen]
    LS --> Router[RouterProvider]
    
    Router --> Root[Root Layout]
    Root --> Navbar[Navbar]
    Root --> Outlet[Outlet]
    Root --> Footer[Footer]
    
    Outlet --> Home[Home]
    Outlet --> Materials[Materials]
    Outlet --> MaterialDetail[MaterialDetail]
    Outlet --> Products[Products]
    Outlet --> ProductDetail[ProductDetail]
    Outlet --> Artisans[Artisans]
    Outlet --> Rituals[Rituals]
    Outlet --> Roots[Roots]
    Outlet --> Cart[Cart]
    Outlet --> Checkout[Checkout]
    Outlet --> Login[Login]
    Outlet --> Register[Register]
    Outlet --> Account[Account]
    Outlet --> NotFound[NotFound]
    
    Home --> Hero[Hero]
    Home --> Philosophy[Philosophy]
    Home --> WebGLShow[WebGLShowcase]
    Home --> MatShow[MaterialShowcase]
    Home --> FeatJourney[FeaturedJourney]
    
    MaterialShowcase --> MatCard[MaterialCard]
    MatCard --> WebGL[WebGLImageReveal]
    MatCard --> IMask[InteractiveImageMask]
```

## Key Interactions

| Trigger | Context Action | Persistence | UI Update |
|---------|---------------|-------------|-----------|
| Login | `AuthContext.login()` | `sattva_user` | Navbar, Protected Routes |
| Register | `AuthContext.register()` | `sattva_user`, `sattva_users` | Navbar, Account Access |
| Add to Cart | `CartContext.addItem()` | `sattva_cart` | Cart Count, Toast |
| Update Cart | `CartContext.updateQuantity()` | `sattva_cart` | Cart Total, Item Count |
| Toggle Wishlist | `WishlistContext.toggle()` | `sattva_wishlist` | Heart Icon, Count |
| Place Order | `AuthContext.addOrder()` + `CartContext.clearCart()` | `sattva_user`, `sattva_cart` | Order History, Empty Cart |
| View Product | `AuthContext.addRecentlyViewed()` | `sattva_user` | Recently Viewed Section |

## Technology Stack_Flow

```
User Request
    ↓
Vite Dev Server (Port 8443)
    ↓
index.html → main.tsx → App.tsx
    ↓
React 19 + React Router 7
    ↓
Context Providers (Auth, Cart, Wishlist)
    ↓
Route Matching → Page Components
    ↓
Data Imports (data/*.ts)
    ↓
Tailwind CSS v4 Styling
    ↓
Three.js/WebGL Effects
    ↓
localStorage Persistence
    ↓
Browser Render
```

This flowchart documents the complete system architecture, routing, user journeys, data flows, and component hierarchy for the Sattva Cloud Angadi e-commerce platform.