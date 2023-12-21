import {BrowserRouter, Routes, Route} from 'react-router-dom'

import GetProductsList from '../views/inventory/GetProductsList'

const Inventory = () => {
    return (
        <>
        <Routes>
            <Route path='/products-list' element={<GetProductsList/>}></Route>
        </Routes>
        </>
    )
}

export default Inventory