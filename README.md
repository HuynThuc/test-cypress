# Refactor document

`using TypeScript should be use type`
`should create a index.ts for each folder`

## Shared Components

- Card
- Table
- Tooltip
- Modal
- Button
- Select
- Input
- TextArea
- ...

## Shared Hooks

- `useMutation`: Handles common error cases.
- `useQuery`: Handles common error cases.
- `useDebounce`
- `useCombineRef`

## Convention

### Naming

- **File Naming**: Follow a Pascal Case naming convention.
    - Examples: UserList.tsx, CustomHooks.tsx, FetchUser.ts.
- **Folder Naming**: Follow a Kebab Case naming convention.
    - Examples: master-card, public-pages.
- **Tsx Files**: For every `.tsx` file, create a corresponding `.scss` file to define Tailwind CSS. Separate the `.tsx` and `.css` files.

## Project Structure

### App

- **Layout**: Defines layout to render or redirect to, such as guest, admin, auth.
- **Pages** (Guest, Admin, Auth): Each page defines the header and renders corresponding modules.
- **Modules**: Defines page content.

    - **Apis**
    - **Components**: One module should be split into many components. A large component should have many small components.
        - Examples: ActionButtons.tsx
    - **Constants**
        - Examples: MasterCard.constants.ts
    - **Hooks**: Contains `useEffect` or returns callback functions related to state.
        - Examples: CustomHook.tsx
    - **Services**: Defines logic of modules or components.
        - Examples: MasterCard.services.ts
    - **Utils**: Defines helper functions without including logic.
        - Examples: MasterCard.utils.ts
    - **Types**: Defines types or interfaces.
        - Examples: MasterCard.types.ts


- **Shared** (Same as Modules, use to Common Functionality).

    - **Apis**
    - **Components**
    - **Constants**
    - **Hooks**
    - **Services**
    - **Utils**
    - **Types**
 
## Error message
- **Required**: Trường thông tin không được để trống.
- **Length**: Trường thông tin yêu cầu độ dài từ {min} đến {max} ký tư.
- **Email**: Trường thông tin định dạng Email.
- **Các loại khác**: Trường thông tin ....................
