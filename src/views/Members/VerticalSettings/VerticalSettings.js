import React, { Component } from 'react'
import {
    Col
} from 'reactstrap'
import PropTypes from 'prop-types'

import Tabs from '../../../components/Tabs'
import Soccer from './Soccer'
import Sports from './Sports'
import Parlay from './Parlay'
import Casino from './Casino'
import Virtual from './Virtual'
import LiveCasino from './LiveCasino'
import KenoLottery from './KenoLottery';
import Cricket from './Cricket';
import { formattedMessages } from '../../../translations/formattedMessageTranslation'





export default class VerticalSettings extends Component {

    static propTypes = {
        data: PropTypes.object,
        handleChange: PropTypes.func,
        handleItemSelection: PropTypes.func,
        toggleTakeRemaining: PropTypes.func
    }





    render() {

        const { handleChange, data, handleItemSelection, userType,
            togglePTSettings, toggleTakeRemaining, toggleBrandRestriction } = this.props

        if (!data) {
            return <p style={{ marginLeft: 15 }}>Something went wrong...</p>
        }


        return (
            <Col xs="12" md="12">
                <Tabs>
                    <div label={formattedMessages.soccer}>
                        <Soccer
                            {...this.props}
                            userType={userType}
                            data={data.categorySoccer}
                            enableCopyPT={data.enableCopyPT}
                            togglePTSettings={togglePTSettings}
                            toggleTakeRemaining={toggleTakeRemaining}
                        />
                    </div>
                    <div label={formattedMessages.sports}>
                        <Sports
                            {...this.props}
                            userType={userType}
                            handleChange={handleChange}
                            handleItemSelection={handleItemSelection}
                            data={data.categorySports}
                            toggleTakeRemaining={toggleTakeRemaining}
                        />
                    </div>
                    <div label={formattedMessages.parlay}>
                        <Parlay
                            {...this.props}
                            userType={userType}
                            handleChange={handleChange}
                            data={data.categoryParlay}
                            toggleTakeRemaining={toggleTakeRemaining}
                        />
                    </div>

                    <div label={formattedMessages.virtual}>
                        <Virtual
                            {...this.props}
                            userType={userType}
                            handleChange={handleChange}
                            data={data.categoryVirtual}
                            toggleTakeRemaining={toggleTakeRemaining}
                        />
                    </div>

                    <div label="Live Casino">
                        <LiveCasino
                            {...this.props}
                            userType={userType}
                            handleChange={handleChange}
                            data={data.categoryLiveCasino}
                            toggleTakeRemaining={toggleTakeRemaining}
                            toggleBrandRestriction={toggleBrandRestriction}
                            categoryId={6}
                        />
                    </div>

                    <div label="Games">
                        <Casino
                            {...this.props}
                            userType={userType}
                            handleChange={handleChange}
                            data={data.categoryGames}
                            toggleTakeRemaining={toggleTakeRemaining}
                        />
                    </div>


                    <div label={'Cricket'}>
                        <Cricket
                            {...this.props}
                            userType={userType}
                            handleChange={handleChange}
                            data={data.categoryCricket}
                            toggleTakeRemaining={toggleTakeRemaining}
                        />
                    </div>

                    <div label="Keno/Lottery">
                        <KenoLottery
                            {...this.props}
                            userType={userType}
                            handleChange={handleChange}
                            data={data.categoryLotto}
                            toggleTakeRemaining={toggleTakeRemaining}
                        />
                    </div>
                </Tabs>
            </Col>
        )
    }
}
