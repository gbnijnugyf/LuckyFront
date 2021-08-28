import React from 'react'

export default function Wishes(props) {

    const { tagName } = props.history.location.state || { }

    return (
        <div>
            我的愿望池--{tagName}
        </div>
    )
}
