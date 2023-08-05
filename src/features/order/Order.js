import { useSelector, useDispatch, selectCount } from "react-redux";

export default function Order() {
    const count = useSelector(selectCount);
    const dispatch = useDispatch();

    return (
        <div>
            <div></div>
        </div>
    );
}
