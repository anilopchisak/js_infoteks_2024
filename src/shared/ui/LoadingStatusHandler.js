import React from 'react';
import {LOADING_STATUS} from "../../app/utils/storeUtils";

const LoadingStatusHandler = ({loadingStatus, children}) => {
    return (
        <div>
            {loadingStatus === LOADING_STATUS.IDLE &&
                <div>
                    Connection error
                </div>
            }
            {loadingStatus === LOADING_STATUS.LOADING &&
                <div>
                    Loading...
                </div>
            }
            {loadingStatus === LOADING_STATUS.ERROR &&
                <div>
                    Error loading
                </div>
            }
            {loadingStatus === LOADING_STATUS.NOT_FOUND &&
                <div>
                    Data not found
                </div>
            }
            {loadingStatus === LOADING_STATUS.SUCCESS &&
                <div>
                    {children}
                </div>
            }
        </div>
    );
};

export default LoadingStatusHandler;