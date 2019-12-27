import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import React from 'react';
import { FormModel } from './FormModel';
import Form from './Form';

const Home = () => {

    // Load all the tabs
    const forms: FormModel[] = [ 
        {
            id: 1,
            productName: 'test',
            url: 'https://test.com',
            keyword: 'keyword',
            email: 'email@gmail.com',
            startWatchDate: new Date("2019-12-20"),
            endWatchDate: new Date("2020-12-10")
        },
        {
            id: 2,
            productName: 'test2',
            url: 'https://test.com',
            keyword: 'keyword',
            email: 'email@gmail.com',
            startWatchDate: new Date("2019-12-20"),
            endWatchDate: new Date("2020-12-10")
        },
    ]

    return (
        <div className="container">
            <h1>Inventory Check</h1>
            <Tabs>
                <TabList>
                    { forms.map( form => <Tab>{form.productName}</Tab>)}
                </TabList>
                { forms.map( form => <TabPanel><Form {...form}/></TabPanel>)}
            </Tabs>
        </div>
    )
 
};

export default Home;