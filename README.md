# Hotel booking management dashboard application

Jul 2024 - Sep 2024  

## Preview

![localhost_5173_dashboard (1)](https://github.com/user-attachments/assets/f3a0a2bb-bb36-4576-b72d-07fef18aa331)


[Application URL, click and explore!](https://hotelbooking-oqevfug02-wontae-chois-projects-63012546.vercel.app)

### Notice

**Login credentials**

Id: test@test.com <br/>
Password: test1234

## Purpose of the Project

**Booking management application for hotel staff**

This project was developed while following the [Udemy course](https://www.udemy.com/course/the-ultimate-react-course). 

After transitioning back from Flutter to the JavaScript ecosystem, The goal was to build an app utilizing the commonly used and conventional libraries in React.

## Tech Stack

- React.js
- Supabase database, storage, email authentication and row level security
- React query
- React-router-dom(dynamic routing with search URL and path, nested routing)
- Context API (darkmode implementation & compound components)
- Rechart
- React-hook-form
- Styled components

## Contributions

**Overview**

A dashboard app for hotel staff to manage bookings.  

The dashboard includes charts providing an overview of booking status, and an interface to quickly process check-ins/check-outs for the current day.

**Contributions**

Although I followed the Udemy course, I actively developed features on my own. For example, I would pause the videos to implement features first or modify the data fetched from the server into an appropriate structure for the client.

Each task was committed separately, with commits organized for easy reference to library usage or when a feature was completed.

**Commit history**
![Commit history](https://github.com/user-attachments/assets/ba7b0d82-1f2c-41b2-93a5-c9b7979a505f)

## Main Features

1. Supabase email OAuth and image storage.
2. Visualization and charts showing check-in status, revenue, and booking rates based on room availability.
3. Ability to process check-ins/check-outs for today's bookings from the dashboard.
4. Detailed booking page displaying guest information, check-in/check-out dates, room details, breakfast inclusion, etc.
5. Cabin dashboard where cabins can be sorted by price or capacity, with options to edit, add, or delete room information.
6. Ability to create hotel staff accounts.
7. Modifying global hotel system settings, such as minimum/maximum nights, maximum guests, and breakfast prices.


## Key Learnings and Takeaways

**How to decouple component state with compound components**

Typically, when managing the visibility of components like modals or hamburgers, the state (e.g., `isModalOpen`) must be controlled in the parent component, leading to the state being tightly coupled.


```js
export default function Parent({ children }) {
  const [isModalOpen, setIsModalOpen] = useState(true);
  return (
    <Modal onClose={setIsModalOpen((isModalOpen) => !isModalOpen)}>
      <Content />
    </Modal>
  );
}
```

Compound components, on the other hand, use Context API, allowing the open/close logic of the modal to be handled within the modal itself, rather than in the parent component.

```js
export default function Modal({ children }) {
  const [openName, setOpenName] = useState("");
  const open = (openName) => setOpenName(openName);
  const close = () => setOpenName("");
  return (
    <ModalContext.Provider
      value={{
        openName,
        open,
        close,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}
export function Open({ ModalOpeningComponent, openWindowName }) {
  const { open } = useContext(ModalContext);
  // How to add event handler to a component   
  // https://react.dev/reference/react/cloneElement
  return cloneElement(ModalOpeningComponent, { onClick: () => open(openWindowName) });
}

export function Window({ Content, name }) {
  const { openName, close } = useContext(ModalContext);

  if (name !== openName) return null;
    // Managing openName as a global state with Context API ensures that only one modal can be displayed at a time across the entire app.
  return createPortal(
     <WindowContainer>
        <Button onClick={close}>
          Close Modal
        </Button>
         {/*
         If you want a button inside the Content component to also trigger the close 
         action when clicked, pass the onCloseModal prop to all components rendered as Content. Then, simply assign onClick={onCloseModal} to the button you want to trigger the close action.
         */}
        {cloneElement(Content, { onCloseModal: close })}
      </WindowContainer>,
     // createPortal changes the physical placement of the DOM node into the first child of document.body to avoid potential overlay CSS conflicts.
    document.body 
  );
}

Modal.Open = Open;
Modal.Window = Window;
```

This approach decouples the modal's state from the parent, making it unnecessary for the parent to manage the modal's open state.

```js
export default function Parent({ children }) {
  return (
   <Modal>
      <Modal.Open openWindowName="contentName">
         <Button>Open Content</Button>
      </Modal.Open>
      <Modal.Window name="contentName">
         <Content/>
      </Modal.Window>
   </Modal>
  );
}
```