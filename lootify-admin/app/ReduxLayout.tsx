import { Provider } from "react-redux";
import { store } from "./redux/store";

export default function ReduxLayout({ children }: { children: any }) {
  return <Provider store={store}>{children}</Provider>;
}
