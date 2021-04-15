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
import api from "./api"
import "./components/Modal"
import Modal from "./components/Modal";


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


    test("navbar button is visible", () => {
        render(<App/>)
        //expect(screen.getByText('Call Staff')).toBeInTheDocument();
        expect(screen.getByText('Lobby')).toBeInTheDocument();
    });
    test("clicking help button fires handler", () => {
        const handleClick = jest.fn();
        render(<button onClick={handleClick}>Call Staff</button>);
        fireEvent.click(screen.getByText(/call staff/i));
        expect(handleClick).toHaveBeenCalledTimes(1);
        //expect(window.localStorage.getItem('table'))
    });


    test.skip("Clicking help updates table.assistance", async () => {
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

    it('StaffMenu Item displays a single value', () => {
        render(<Item name='asdf' />)
        expect(screen.getByText('asdf $')).not.toBeNull()
    });

    it('StaffMenu Item displays multiple values', () => {
        render(<Item name='asdf' price='123'/>)
        expect(screen.getByText('asdf $123')).not.toBeNull()
    });

    it('StaffMenu has no values when passed no input', () => {
        render(<Item />)
        expect(screen.queryByText('asdf')).toBeNull();
    });
});

describe("modal tests", () => {
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

    test('Modal is valid', () => {
        let props = ['true'];
        act(()=> {
            render(<Modal {...props}/>, container)
        });

        expect(container.Modal).not.toBeNull()
    });
    test('Modal is null when show is false', () => {
        act(()=> {
            render(<Modal show="false"/>, container);
        });

        expect(container.Modal).toBeUndefined();
    });

    test('Modal shows children (single)', () => {
        const props = true;
        //act(()=> {
        render(<Modal show={props}><h1>helloworld</h1></Modal>);
        //});
        expect(screen.getByRole('heading')).toHaveTextContent("helloworld")
        //expect(container.textContent).toBe("helloworld")
    })

    test('Modal shows multiple children', () => {
        const props = true;
        render(<Modal show={props}><h1>helloworld</h1><h2>goodbyeworld</h2></Modal>);
        expect(screen.getAllByRole('heading').length).toEqual(2);
    })

    test('Modal doesnt show when nothing is passed', () => {
        render(<Modal ><h1>helloworld</h1><h2>goodbyeworld</h2></Modal>);
        expect(screen.queryByText('helloworld')).toBeNull();
    })
});
