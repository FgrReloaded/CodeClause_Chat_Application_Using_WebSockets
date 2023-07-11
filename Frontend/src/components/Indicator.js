import React, {useState} from 'react';
import '../css/indicator.css';


const Indicator = ({users}) => {
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-12 activeUser">
                        <h4>Active Users</h4>
                    </div>
                    <div className={`col-12 `}>
                        {users ? (
                            <div>
                                <p>
                                    {users.map(({ name }) => (
                                        <li key={name} className="userName">
                                            {name}
                                        </li>
                                    ))}
                                </p>
                            </div>
                        )
                            : null
                        }
                    </div>
                </div>
            </div>
        </>
    );
};

export default Indicator;