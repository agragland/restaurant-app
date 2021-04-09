// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import {act, cleanup, fireEvent, render, screen, waitFor} from '@testing-library/react';
import { unmountComponentAtNode } from "react-dom";
import App from "./app";
import {StaffMenu,Item} from "./components/Navbar/StaffMenu";
import {Navbar} from "./components";
import userEvent from "@testing-library/user-event";
import api from "./api"


// Examples: https://reactjs.org/docs/testing-recipes.html


describe("help button tests",  () => {
    let container = null;
    beforeEach(() => {
        // setup a DOM element as a render target
        container = document.createElement("div");
        document.body.appendChild(container);
        jest.useFakeTimers();
    });

    afterEach(() => {
        // cleanup on exiting
        unmountComponentAtNode(container);
        container.remove();
        container = null;
        jest.runOnlyPendingTimers();
        jest.useRealTimers();
    });


    test("Help button is visible", () => {
        render(<App/>)
        expect(screen.getByText('Call Staff')).toBeInTheDocument();
    });
    test("clicking help button fires handler", () => {
        const handleClick = jest.fn();
        render(<button onClick={handleClick}>Call Staff</button>);
        fireEvent.click(screen.getByText(/call staff/i));
        expect(handleClick).toHaveBeenCalledTimes(1);
        //expect(window.localStorage.getItem('table'))
    });


    test("Clicking help updates table.assistance", async () => {
        // THIS DOES NOT WORK, async issues
        let table = {
            table_num: 1,
            status: "Occupied",
            refills: '',
            assistance: false
        }
        jest.spyOn(api,"getTableByNum").mockImplementation(() =>
            Promise.resolve({
                json: () => Promise.resolve(table)
            })
        );
        jest.spyOn(api,"updateTable").mockImplementation((new_table) =>
            Promise.resolve(table = new_table)
        );
        render(<Navbar />);
        fireEvent.click(screen.getByText(/call staff/i));
        await waitFor(()=>screen.getByRole(""))
        expect(table.assistance).toBe(true);

        // remove the mock to ensure tests are completely isolated
        global.fetch.mockRestore();
    });
});


describe('Addition', () => {
    it('knows that 2 and 2 make 4', () => {
        expect(2 + 2).toBe(4);
    });
});

describe('StaffMenu Item returns values', () => {
    let container = null;
    beforeEach(() => {
        // setup a DOM element as a render target
        container = document.createElement("div");
        document.body.appendChild(container);
    });

    afterEach(() => {
        // cleanup on exiting
        unmountComponentAtNode(container);
        container.remove();
        container = null;
    });

    it('StaffMenu returns values', () => {
        const price = 123;
        const name = 'asdf';
        const props = ['asdf','123'];
        act(()=> {
            render(<Item {...props}/>, container)
        });

        expect(container.Item).not.toBeNull()
        expect(container.textContent).toBe("asdf")
        //expect(Item({name,price})).toHaveTextContent('asdf 123')
        //expect(Item({name, price})).toContain(name);
        //expect(Item({name, price})).toContain(price);

    });
});

describe("Api tests", () => {

});
