import React, { useState } from "react";
import { ProductWatch, ProductWatchTableColumns } from "./ProductWatchModel";
import axios from "axios";
import MaterialTable from "material-table";

const Home = () => {
  let defaultList: ProductWatch[] = [
    {
      id: "1234",
      productName: "test",
      url: "https://test.com",
      keyword: "keyword",
      email: "email@gmail.com",
      startWatchDate: "2019-12-20",
      endWatchDate: "2020-12-10"
    },
    {
      id: "45332",
      productName: "test2",
      url: "https://test.com",
      keyword: "keyword",
      email: "email@gmail.com",
      startWatchDate: "2019-12-20",
      endWatchDate: "2020-12-10"
    }
  ];

  const [productWatchList, setProductWatchList] = useState(defaultList);

  const getProductWatchList = () => {
    axios
      .get("./getAllData")
      .then(response => {
        console.log(response);
        setProductWatchList(defaultList);
      })
      .catch(error => {
        console.log(error);
      });
  };

  getProductWatchList();

  return (
    <div className="container">
      <MaterialTable
        title="Inventory Check"
        columns={ProductWatchTableColumns}
        data={productWatchList}
        editable={{
          onRowAdd: newData => {
            return axios
              .post("./notify", newData)
              .then(response => {
                console.log(response);
              })
              .catch(error => {
                console.log(error);
                return Promise.reject();
              });
          },
          onRowUpdate: (newData, oldData) => {
              debugger;
            axios
              .post("./update", { id: newData.id })
              .then(response => {
                console.log(response);
                getProductWatchList();
              })
              .catch(error => {
                console.log(error);
                return Promise.reject();
              });
            return Promise.resolve();
          },
          onRowDelete: (oldData: ProductWatch) => {
            axios
              .post("./delete", { id: oldData.id })
              .then(response => {
                console.log(response);
                getProductWatchList();
              })
              .catch(error => {
                console.log(error);
                return Promise.reject();
              });
            return Promise.resolve();
          }
        }}
      />
    </div>
  );
};

export default Home;
