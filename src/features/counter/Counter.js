import React, { useState } from "react";
import { useSelector, useDispatch, selectCount } from "react-redux";
import { increment, incrementAsync } from "./counterSlice";

export default function Counter() {
    const count = useSelector(selectCount);
    const dispatch = useDispatch();

    return (
        <div>
            <div></div>
        </div>
    );
}