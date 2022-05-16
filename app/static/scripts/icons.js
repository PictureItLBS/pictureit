let iconCache = {}

document.querySelectorAll("span[icon]").forEach(
    async iconElement => {
        const icon = iconElement.getAttribute("icon")

        if (!iconCache[icon]) {
            const iconUrl   = `/static/icons/${icon}.svg`
            const iconData  = await fetch(iconUrl)
            iconCache[icon] = await iconData.text()
        }

        iconElement.innerHTML = iconCache[icon]
    }
)