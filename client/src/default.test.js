// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import {cleanup, fireEvent, render} from '@testing-library/react';
import {CustomerView} from "./components/pages";
import {Navbar} from "./components/pages/CustomerView/Navbar"
//import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
//import ReactDOM from 'react-dom';
import App from "./app";


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

/*
expect(Item("abc",123)).stringMatching(
    <div>
        <div>
            <p>abc</p>
            <p>123</p>
        </div>
    </div>
)
 */
describe("help button tests",  () => {
    test("renders without crashing", () => {
        render(<App/>)
    });
    test("help button visible", () => {

    });
});
describe('Addition', () => {
    it('knows that 2 and 2 make 4', () => {
        expect(2 + 2).toBe(4);
    });
});
/*
it('Table.Assistance is set to true when customer requests for help', () => {
    const navbar = Navbar()
    /*const {queryByLabelText, getByLabelText} = render(
        <CheckboxWithLabel labelOn="On" labelOff="Off" />,
    );
    const table = render(<CustomerView></CustomerView>)

    expect(Navbar.handleGetItems())
    expect(queryByLabelText(/off/i)).toBeTruthy();

    fireEvent.click(getByLabelText(/off/i));

    expect(queryByLabelText(/on/i)).toBeTruthy();
});

*/

describe('StaffMenu Item returns values', () => {
    const expected = [
        expect.stringMatching('abc'),
        expect.stringMatching('123'),
    ];
    it('matches even if received contains additional elements', () => {
        expect(['abc', 123, 'Evelina']).toEqual(
            expect.arrayContaining(expected),
        );
    });
});