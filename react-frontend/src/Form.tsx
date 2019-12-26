import React, { useState } from 'react'
import { FormModel } from './FormModel';

const Form = (props: FormModel) => {
    const id = props.id;
    const [name, setName] = useState(props.name);
    const [url, setURL] = useState(props.url);
    const [keyword, setKeyword] = useState(props.keyword);
    const [email, setEmail] = useState(props.email);

    const validURL = (url: string): boolean => {
        // https://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-a-url/49849482
        var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
            '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
        return !!pattern.test(url);
    }

    const validEmail = (email: string): boolean => {
        // https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    const formValid = () => {
        if (url === '' || keyword === '' || email === '') {
            return true;
        }
        if (!validURL(url)) {
            return true;
        }
        if (!validEmail(email)) {
            return true;
        }
        return false;
    }

    const handleSubmit = (event: any) => {
        event.preventDefault();
        var xhr = new XMLHttpRequest();
        xhr.addEventListener('load', response => {
            console.log(response);
        });
        xhr.open('POST', './notify');
        const form: FormModel = { id, name, url, keyword, email }
        xhr.send(JSON.stringify(form));
        return false;
    }
    
    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name</label>
                    <input type="text" className="form-control" value={name} onChange={e => setName(e.target.value)} aria-describedby="emailHelp" placeholder="Enter URL" />
                </div>
                <div className="form-group">
                    <label>URL</label>
                    <input type="url" className="form-control" value={url} onChange={e => setURL(e.target.value)} aria-describedby="emailHelp" placeholder="Enter URL" />
                </div>
                <div className="form-group">
                    <label>Keyword</label>
                    <input type="text" className="form-control" value={keyword} onChange={e => setKeyword(e.target.value)} placeholder="Enter keyword" />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} aria-describedby="emailHelp" placeholder="Enter email" />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <button disabled={formValid()} className="btn btn-primary">Submit</button>
            </form>
        </div>
    )

}

export default Form;