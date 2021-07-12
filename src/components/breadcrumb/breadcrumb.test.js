/* eslint-disable no-undef */
import React from 'react';
import { render, fireEvent} from '@testing-library/react';
import Breadcrumb from './breadcrumb';
import '@testing-library/jest-dom';

describe('Unit tests for Breadcrumb component',() => {
    let linkToNameList = [
       {
        link: "#",
        name: "Breadcrumb1",
       },
       {
        link: "#",
        name: "Breadcrumb2",
       },
       {
        link: "#",
        name: "Breadcrumb3",
       }
    ];

    it('There are three breadcrumb items in the breadcrumb',() => {
        const {getByRole} = render(<Breadcrumb linkToNameList={linkToNameList}/>)
        expect(getByRole("list").children.length).toEqual(3);
    })

    linkToNameList = linkToNameList = [
        {
         link: "#",
         name: "Breadcrumb1",
        },
        {
         link: "#",
         name: "Breadcrumb2",
        },
        {
         link: "#",
         name: "Breadcrumb3",
        },
        {
            link: "#",
            name: "Breadcrumb4",
           }
     ];
 
    it('when 4 items are passed, it shows first item, then an overflow item and the last item',()=> {
        const {getByRole} = render(<Breadcrumb linkToNameList={linkToNameList} />)
        const parentUL = getByRole("list");
        expect(parentUL.children.length).toEqual(3);
        expect(parentUL.children[1].getElementsByTagName('span')[0].textContent).toEqual('...');
    })

    it('When 4 items, clicking on overflow item expands and shows all the items', ()=> {
        const {getByRole} = render(<Breadcrumb linkToNameList={linkToNameList}/>)
        fireEvent.click(getByRole("list").children[1]);
        expect(getByRole("list").children.length).toEqual(4);
    })

})