"use client";

import classes from "./page.module.css";
import FilterModalComponent from "@/components/filter-modal/filter-modal.component";
import React from "react";

export default function Home() {
    const [isFilterModalOpen, setIsFilterModalOpen] = React.useState<boolean>(true);
    const dialog = React.useRef<HTMLDivElement>(null);
    

    function detectClickOutside(event: any){

        if(isFilterModalOpen && dialog && !dialog?.current?.contains(event.target as Node)){
            console.log("click outside");
            setIsFilterModalOpen(false);
        }
    }

  return (
    <main
        onClick={(event) => detectClickOutside(event)}
        className={classes["main"]}
    >
        <div ref={dialog}>
            {
                isFilterModalOpen &&
                <FilterModalComponent />
            }
        </div>
        <section className={classes["main__prompt"]}>
            <h1 className={classes["main__prompt__heading"]}>
                Welcome to the world of Pokémon!
            </h1>
            <h3 className={classes["main__prompt__sub-heading"]}>
                Use one of the two options below to access the Pokémon Filter
            </h3>
            <div className={classes["main__prompt__action"]}>
                <button
                    onClick={() => setIsFilterModalOpen(true)}
                    className={classes["main__prompt__action__btn"]}
                >
                    Pokémon Filter
                </button>
                |
                <div className={classes["main__prompt__action__cmd"]}>
                    <kbd>ctrl</kbd> + <kbd>k</kbd>
                </div>
            </div>
        </section>
    </main>
  );
}
