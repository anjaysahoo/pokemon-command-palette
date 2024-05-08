"use client";

import React, {useEffect} from 'react';
import classes from './filter-modal.component.module.css';
import {FilterModel} from "@/models/filter.model";
import filterConfig from "@/config/filter.config";
import {SelectedFilterModel} from "@/models/selected-filter.model";
import {useRouter} from "next/navigation";
import {InputType} from "@/config/app-constants.config";
import IconLib from "@/lib/icon.lib";
import {arrowForwardPath, checkPath} from "@/utils/app-icon.util";


function FilterModalComponent() {
    const [selectedPrimaryItem, setSelectedPrimaryItem] =
        React.useState<string>(filterConfig[0].value);
    const [selectedSecondaryItem, setSelectedSecondaryItem] =
        React.useState<FilterModel | null>();
    const [secondaryItemList, setSecondaryItemList] =
        React.useState<FilterModel[]>([]);
    const [valueItemList, setValueItemList] =
        React.useState<FilterModel[]>([]);
    const[, updateState] = React.useState<string>();
    const[isShowBtnDisabled, setIsShowBtnDisabled] = React.useState<boolean>(true);
    const router = useRouter();
    const [selectedFiltersAndValues, setSelectedFiltersAndValues]
        = React.useState<SelectedFilterModel>(
        {
            primary: filterConfig[0].value,
            secondary: []
        }
    )

    function primaryItemSelectionHandler(item: FilterModel) {

        setSelectedPrimaryItem(item.value);

        const selectedItemValueList = filterConfig.filter((obj) => obj.value === item.value)[0].options as FilterModel[];
        setSecondaryItemList(selectedItemValueList);

        reset(item);
    }

    function reset(item: FilterModel){
        setSelectedFiltersAndValues( {
            primary: item.value,
            secondary: []
        });
        setValueItemList([]);
        setSelectedSecondaryItem(null);
        setIsShowBtnDisabled(true);
    }

    function secondaryItemSelectionHandler(item: FilterModel) {
        setSelectedSecondaryItem(item);
        const selectedItemValueList = secondaryItemList.filter((obj) => obj.value === item.value)[0].options as FilterModel[];
        setValueItemList(selectedItemValueList);
    }

    function isChecked(passedSelectedFiltersAndValues: SelectedFilterModel, primaryValue: string, secondaryValue: string, inputType: string, value: string) {
        if(primaryValue !== passedSelectedFiltersAndValues.primary)
            return false;

        const secondaryFilterItems =
            passedSelectedFiltersAndValues.secondary.filter((obj) => obj.key === secondaryValue);

        return !(secondaryFilterItems.length === 0 ||
            secondaryFilterItems[0].inputType !== inputType ||
            !secondaryFilterItems[0].value.includes(value));
    }

    function optionSelectionHandler(secondaryValue: string, inputType: string, value: string) {
        setSelectedFiltersAndValues(updateObject(selectedFiltersAndValues, secondaryValue, inputType, value));
        setIsShowBtnDisabled(false);
        updateState(new Date().toString());
    }

    function updateObject(currentSelectedFiltersAndValues: SelectedFilterModel, secondaryValue: string, inputType: string, value: string) {
        // Iterate over the secondary array

        let isValueUpdated = false;
        for (let i = 0; i < currentSelectedFiltersAndValues.secondary.length; i++) {
            // Find the object with the specified key
            if (currentSelectedFiltersAndValues.secondary[i].key === secondaryValue) {
                // Check inputType
                if (inputType === InputType.RADIO) {
                    // If inputType is "radio", update the value
                    currentSelectedFiltersAndValues.secondary[i].value = [value];
                } else if (inputType === InputType.CHECKBOX) {
                    // If inputType is "checkbox"
                    const index = currentSelectedFiltersAndValues.secondary[i].value.indexOf(value);
                    // If value is not in the array, add it; otherwise, remove it
                    if (index === -1) {
                        currentSelectedFiltersAndValues.secondary[i].value.push(value);
                    } else {
                        currentSelectedFiltersAndValues.secondary[i].value.splice(index, 1);
                    }
                }
                // Exit loop since the object is found and updated
                isValueUpdated = true;
                break;
            }
        }

        if(!isValueUpdated) {
            currentSelectedFiltersAndValues.secondary.push({
                key: secondaryValue,
                inputType: inputType,
                value: [value]
            })
        }
        return currentSelectedFiltersAndValues;
    }

    function showPokemonHandler(){
        let href = `/search?primary-filter=${selectedFiltersAndValues.primary}`;

        selectedFiltersAndValues.secondary.forEach((obj) => {
            obj.value.forEach((value) => {
                href += `&${obj.key}=${value}`
            })
        })

        router.push(href)
    }

    function getSecondaryFilterCount(passedSelectedFiltersAndValues: SelectedFilterModel, secondaryValue: string){
        let count = passedSelectedFiltersAndValues.secondary.filter((obj) => obj.key === secondaryValue)[0]?.value.length;
        return count !== undefined ? count : 0;
    }

    function getPrimaryFilterCount(passedSelectedFiltersAndValues: SelectedFilterModel, primaryValue: string) {
        if(passedSelectedFiltersAndValues.primary !== primaryValue)
            return 0;
        return passedSelectedFiltersAndValues.secondary.reduce((acc, obj) => acc + obj.value.length, 0);

    }


    useEffect(() => {
        setSecondaryItemList(filterConfig[0].options as FilterModel[])
    }, [])


    function getValueAndLabel(item: FilterModel) {
        const isThisChecked = isChecked(
            selectedFiltersAndValues,
            selectedPrimaryItem,
            selectedSecondaryItem?.value!,
            selectedSecondaryItem?.inputType!,
            item.value
        )

        return (
            <label
                key={item.value}
                htmlFor={item?.value}
                className={classes["modal__main__list__item-val"]}
                style={isThisChecked ? {"backgroundColor": "var(--color-4)"} : {}}
            >
                <input
                    type={selectedSecondaryItem?.inputType}
                    value={item.value}
                    checked={isThisChecked}
                    onChange={(event) => optionSelectionHandler(
                        selectedSecondaryItem?.value!,
                        selectedSecondaryItem?.inputType!,
                        event.target.value
                    )}
                    name={selectedSecondaryItem?.value}
                    id={item?.value}
                    className={classes["modal__main__list__item-val__input"]}/>
                {
                    isThisChecked ?
                        <div
                            className={classes["modal__main__list__item-val__icon"]}
                            style={selectedSecondaryItem?.inputType === InputType.CHECKBOX ? {"borderRadius": "5px"} : {"borderRadius": "50%"}}
                        >
                            <IconLib d={checkPath} color="var(--color-3)" size={"0.8em"}/>
                        </div>
                        :
                        <div
                            className={classes["modal__main__list__item-val__icon"]}
                            style={selectedSecondaryItem?.inputType === InputType.CHECKBOX ? {"borderRadius": "5px"} : {"borderRadius": "50%"}}
                        ></div>
                }

                <div className={classes["modal__main__list__item-val__label"]}
                >{item.label}</div>
            </label>
        )
    }


    return (
        <dialog className={classes["modal"]}>
            <main className={classes["modal__main"]}>
                <ul className={classes["modal__main__list"]}>
                    {
                        filterConfig.map((item) => (
                            <li
                                onClick={() => primaryItemSelectionHandler(item)}
                                key={item.value}
                                className={classes["modal__main__list__item-key"]}
                                style={selectedPrimaryItem === item.value ? {backgroundColor: "var(--primary-color)"} : {}}
                            >
                                <div className={classes["modal__main__list__item-key__name"]}>{item.label}</div>
                                {
                                    getPrimaryFilterCount(selectedFiltersAndValues, item.value) > 0 &&
                                    <div className={classes["modal__main__list__item-key__count"]}>
                                        {getPrimaryFilterCount(selectedFiltersAndValues, item.value)}
                                    </div>
                                }
                                <IconLib d={arrowForwardPath} color="var(--text-color)" size={"0.9em"} strokeWidth={1}/>
                            </li>
                        ))
                    }
                </ul>

                <ul className={classes["modal__main__list"]}>
                    {
                        secondaryItemList.map((item) => (
                            <li
                                onClick={() => secondaryItemSelectionHandler(item)}
                                key={item.value}
                                className={classes["modal__main__list__item-key"]}
                                style={selectedSecondaryItem?.value === item.value ? {backgroundColor: "var(--primary-color)"} : {}}
                            >
                                <div className={classes["modal__main__list__item-key__name"]}>{item.label}</div>
                                {
                                    getSecondaryFilterCount(selectedFiltersAndValues, item.value) > 0 &&
                                    <div className={classes["modal__main__list__item-key__count"]}>
                                        {getSecondaryFilterCount(selectedFiltersAndValues, item.value)}
                                    </div>
                                }
                                <IconLib d={arrowForwardPath} color="var(--text-color)" size={"0.9em"} strokeWidth={1}/>
                            </li>
                        ))
                    }
                </ul>

                <ul className={`${classes["modal__main__list"]} ${classes["modal__main__list-val"]}`}>
                    {
                        valueItemList.map((item) => (
                            getValueAndLabel(item)
                        ))
                    }
                </ul>
            </main>
            <footer className={classes["modal__footer"]}>
                <button
                    onClick={() => primaryItemSelectionHandler(filterConfig[0])}
                    className={classes["modal__footer__btn-reset"]}>Reset all filters</button>
                <button
                    disabled={isShowBtnDisabled}
                    onClick={showPokemonHandler}
                    className={classes["modal__footer__btn-show"]}>
                    <div>Show pokemons</div>
                     <IconLib d={arrowForwardPath} color="var(--text-color)" size={"0.9em"} strokeWidth={2}/>
                </button>
            </footer>
        </dialog>
    );
}

export default FilterModalComponent;
