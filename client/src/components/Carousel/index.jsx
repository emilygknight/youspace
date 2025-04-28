"use client"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export function InfiniteImageCarousel({ images, speed = 10 }) {
    const [duplicatedImages, setDuplicatedImages] = useState([])

    useEffect(() => {
        setDuplicatedImages([...images, ...images])
    }, [images])

    return (
        <div className="relative w-full overflow-hidden h-120">
            <motion.div
                className="flex absolute"
                style={{ width: `${duplicatedImages.length * 300 + duplicatedImages.length * 32}px` }}
                animate={{
                    x: ["0%", "-50%"]
                }}
                transition={{
                    x: {
                        repeat: Infinity,
                        repeatType: "loop",
                        duration: speed,
                        ease: "linear"
                    }
                }}
            >
                {duplicatedImages.map((image, index) => (
                    <div
                        key={index}
                        className="relative mx-4 bg-white p-3 rounded-xl shadow-lg z-20 flex-shrink-0"
                    >
                        <img
                            src={image || "/placeholder.svg"}
                            width={300}
                            height={300}
                            alt={`Carousel image ${(index % images.length) + 1}`}
                            className="rounded-lg"
                        />
                    </div>
                ))}
            </motion.div>
        </div>
    )
}
