const Card = ({name,imgSource}) => {
    return (
        <article  className='card '>
                    <img src={imgSource} alt={name} />
                    <h2>{name}</h2>
                    
        </article>
    )
}

export default Card