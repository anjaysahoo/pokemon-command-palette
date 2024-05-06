"use client";

import {useSearchParams} from "next/navigation";

export default function Search() {
    const searchParams = useSearchParams()

    searchParams.forEach((value, key) => {
        console.log(value, key);
    });

    // URL -> `/dashboard?search=my-project`
    // `search` -> 'my-project'
    return <>Search: {JSON.stringify(searchParams)}</>
}
