import React, { useState } from "react";
import { ProductWatch, ProductWatchTableColumns } from "./ProductWatchModel";
import axios from "axios";
import MaterialTable from "material-table";
var moment = require('moment');

const Home = () => {
  const defaultProductWatchList:ProductWatch[] = [];
  const [productWatchList, setProductWatchList] = useState(defaultProductWatchList);

  const getProductWatchList = () => {
    axios
      .get("./getAllData")
      .then(response => {
        console.log(response);
        // @ts-ignore We know response is always type ProductWatch[]
        setProductWatchList(response);
      })
      .catch(error => {
        console.log(error);
      });
  };

  getProductWatchList();

  const translateDates = (productWatch: ProductWatch) => {
    const { startWatchDate, endWatchDate } = productWatch;
    return {
      ...productWatch,
      startWatchDate: moment(startWatchDate).format('yyyy-MM-dd'),
      endWatchDate: moment(endWatchDate).format('yyyy-MM-dd'),
    };
  };

  return (
    <div className="container">
      <MaterialTable
        title="Inventory Check"
        // @ts-ignore
        columns={ProductWatchTableColumns}
        data={productWatchList}
        editable={{
          onRowAdd: newData => {
            return axios
              .post("./addProductWatch", translateDates(newData))
              .then(response => {
                getProductWatchList();
              })
              .catch(error => {
                console.log(error);
                return Promise.reject();
              });
          },
          onRowUpdate: (newData, oldData) => {
            debugger;
            axios
              .post("./updateProductWatch", translateDates(newData))
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
              .post("./deleteProductWatch", { id: oldData.id })
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
