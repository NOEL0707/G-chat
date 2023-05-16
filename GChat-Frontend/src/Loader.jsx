import React from 'react';
import { ColorRing } from 'react-loader-spinner';
function Loader(props) {
    return (
        <div className='flex justify-center items-center h-full'>
            <ColorRing
            visible={true}
            height="100%"
            width="80"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={['#e53a48','#e53a48','#e53a48','#e53a48','#e53a48']}
          />
        </div>

    );
}

export default Loader;