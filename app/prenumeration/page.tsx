import { useEffect, useState } from "react";
import {  prenumerationer } from "../../lib/Prenumerationer";
import List from "@/components/prenumeration/list";

export default function prenumeration() {

    return (
        <>
            <h1 className="h1">Prenumerationer</h1>
            <List prenumerationList={prenumerationer} />
        </>
    )
} 