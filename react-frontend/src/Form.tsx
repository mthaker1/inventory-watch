import React, { useState } from "react";
import { FormModel } from "./FormModel";
import axios from "axios";

const Form = (props: FormModel) => {
  const id = props.id;
  const [productName, setProductName] = useState(props.productName);
  const [url, setURL] = useState(props.url);
  const [keyword, setKeyword] = useState(props.keyword);
  const [email, setEmail] = useState(props.email);
  const [startWatchDate, setStartWatchDate] = useState(props.startWatchDate);
  const [endWatchDate, setEndWatchDate] = useState(props.endWatchDate);
  const validURL = (url: string): boolean => {
    // https://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-a-url/49849482
    var pattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    ); // fragment locator
    return !!pattern.test(url);
  };

  const validEmail = (email: string): boolean => {
    // https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const formValid = () => {
    if (url === "" || keyword === "" || email === "") {
      return true;
    }
    if (!validURL(url)) {
      return true;
    }
    if (!validEmail(email)) {
      return true;
    }
    return false;
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const formData: FormModel = {
      id,
      productName,
      url,
      keyword,
      email,
      startWatchDate,
      endWatchDate
    };
    axios
      .post("./notify", formData)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Product Name</label>
          <input
            type="text"
            className="form-control"
            value={productName}
            onChange={e => setProductName(e.target.value)}
            placeholder="Enter URL"
          />
        </div>
        <div className="form-group">
          <label>URL</label>
          <input
            type="url"
            className="form-control"
            value={url}
            onChange={e => setURL(e.target.value)}
            placeholder="Enter URL"
          />
        </div>
        <div className="form-group">
          <label>Keyword</label>
          <input
            type="text"
            className="form-control"
            value={keyword}
            onChange={e => setKeyword(e.target.value)}
            placeholder="Enter keyword"
          />
          <small id="emailHelp" className="form-text text-muted">
            Examples: Out of Stock" or "Product not available"
          </small>
        </div>
        <div className="form-group">
          <label>Start Watch Date</label>
          <input
            type="date"
            className="form-control"
            value={`${startWatchDate.getFullYear()}-${startWatchDate.getMonth() + 1}-${startWatchDate.getDate() + 1}`}
            onChange={e => setStartWatchDate(new Date(e.target.value))}
          />
        </div>
        <div className="form-group">
          <label>End Watch Date</label>
          <input
            type="date"
            className="form-control"
            value={`${endWatchDate.getFullYear()}-${endWatchDate.getMonth() + 1}-${endWatchDate.getDate() + 1}`}
            onChange={e => setEndWatchDate(new Date(e.target.value))}
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Enter email"
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <button disabled={formValid()} className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;
