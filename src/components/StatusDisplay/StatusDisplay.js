/*Author: Jaimi Maheshbhai Sheta (B00886563)*/

import "./StatusDisplay.css"

function StatusDisplay({status}) {
    if (status) {
        return (
            <h5>
                <span className="label label-active"> Active </span>
            </h5>
        );
    } else {
        return (
            <h5>
                <span className="label label-inactive"> Inactive </span>
            </h5>
        );
    }
}

export default StatusDisplay;
