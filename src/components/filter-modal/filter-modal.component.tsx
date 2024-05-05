"use client";

import React from 'react';
import classes from './filter-modal.component.module.css';
import {Order_By, usePokemonsQuery} from "@/graphql/generated";

function FilterModalComponent() {
    const { data, isLoading, error } = usePokemonsQuery(
    {
        "where": {
        "pokemon_v2_generation": { "name": { "_eq": "generation-iii" } },
        "pokemon_v2_pokemoncolor": { "name": { "_eq": "green" } },
        "pokemon_v2_pokemonhabitat": {
            "pokemon_v2_pokemonhabitatnames": { "name": { "_in": ["grassland", "mountain", "water's edge"] } }
        }
    },
        "order_by": {
        "id": Order_By.Asc
    }
    }
)

    console.log("isLoading : ", isLoading);
    console.log("data : ", data);
    console.log("error : ", error);


    return (
        <dialog open className={classes["modal"]}>
            <main className={classes["modal__main"]}>
                <ul className={classes["modal__main__list"]}>
                    <li className={classes["modal__main__list__item-key"]}>
                        <div className={classes["modal__main__list__item-key__name"]}>Pokemon</div>
                        <div className={classes["modal__main__list__item-key__count"]}>3</div>
                        <div className={classes["modal__main__list__item-key__icon"]}>&gt;</div>
                    </li>
                    <li className={classes["modal__main__list__item-key"]}>
                        <div className={classes["modal__main__list__item-key__name"]}>Moves</div>
                        <div className={classes["modal__main__list__item-key__icon"]}>&gt;</div>
                    </li>
                </ul>

                <ul className={classes["modal__main__list"]}>
                    <li className={classes["modal__main__list__item-key"]}>
                        <div className={classes["modal__main__list__item-key__name"]}>Generation</div>
                        <div className={classes["modal__main__list__item-key__count"]}>1</div>
                        <div className={classes["modal__main__list__item-key__icon"]}>&gt;</div>
                    </li>
                    <li className={classes["modal__main__list__item-key"]}>
                        <div className={classes["modal__main__list__item-key__name"]}>Color</div>
                        <div className={classes["modal__main__list__item-key__icon"]}>&gt;</div>
                    </li>
                    <li className={classes["modal__main__list__item-key"]}>
                        <div className={classes["modal__main__list__item-key__name"]}>Habitat</div>
                        <div className={classes["modal__main__list__item-key__count"]}>2</div>
                        <div className={classes["modal__main__list__item-key__icon"]}>&gt;</div>
                    </li>
                </ul>

                <ul className={`${classes["modal__main__list"]} ${classes["modal__main__list-val"]}`}>
                    <li className={classes["modal__main__list__item-val"]}>
                        <input type={"checkbox"} className={classes["modal__main__list__item-val__input"]}/>
                        <label className={classes["modal__main__list__item-val__label"]}>Grassland</label>
                    </li>
                    <li className={classes["modal__main__list__item-val"]}>
                        <input type={"checkbox"} className={classes["modal__main__list__item-val__input"]}/>
                        <label className={classes["modal__main__list__item-val__label"]}>Mountain</label>
                    </li>
                    <li className={classes["modal__main__list__item-val"]}>
                        <input type={"checkbox"} className={classes["modal__main__list__item-val__input"]}/>
                        <label className={classes["modal__main__list__item-val__label"]}>Water</label>
                    </li>
                </ul>
            </main>
            <footer className={classes["modal__footer"]}>
                <button className={classes["modal__footer__btn-reset"]}>Reset all filters</button>
                <button className={classes["modal__footer__btn-show"]}>Show</button>
            </footer>
        </dialog>
    );
}

export default FilterModalComponent;
