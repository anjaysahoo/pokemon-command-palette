"use client";

import classes from "./page.module.css";
import PokemonsSearchComponent from "@/components/search/pokemons/pokemons.search.component";
import React, {useEffect} from "react";
import {useSearchParams} from "next/navigation";
import MovesSearchComponent from "@/components/search/moves/moves.search.component";
import filterConfig from "@/config/filter.config";
import {PrimaryKeyValue} from "@/config/app-constants.config";

export default function Search() {
    const [count, setCount] = React.useState<number>(0);
    const searchParams = useSearchParams();
    const primaryFilter = searchParams.get("primary-filter");
    const [title, setTitle] = React.useState<string>("");

    function updateCount(val: number){
        setCount(val);
    }

    useEffect(() => {
        const label = filterConfig.filter((obj) => obj.value === primaryFilter)[0].label;
        setTitle(label);

    }, [])

    return(
        <main className={classes["main"]}>
            <section className={classes["main__content"]}>
                <h1 className={classes["main__content__head"]}>
                    Found {count} {title}
                </h1>
                {
                    primaryFilter === PrimaryKeyValue.POKEMONS && <PokemonsSearchComponent updateCount={updateCount}/>
                }
                {
                    primaryFilter === PrimaryKeyValue.MOVES && <MovesSearchComponent updateCount={updateCount}/>
                }
            </section>
        </main>
    )
}
