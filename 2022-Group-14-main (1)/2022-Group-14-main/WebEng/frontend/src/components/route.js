// A route component that will be used to render the components based on the path
const Route = ({ path, children }) => {
  return window.location.pathname === path ? children : null
}

export default Route;