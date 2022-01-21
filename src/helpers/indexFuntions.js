export function getProgressColor(progress){
    let progressColor;
    progress<25
    ?progressColor = "rgba(248, 113, 113, 1)"
    :progress<50
    ?progressColor = "rgba(251, 191, 36, 1)"
    :progress<70
    ?progressColor = "rgba(217, 119, 6, 1)"
    :progress<85
    ?
    progressColor = "rgba(52, 211, 153, 1)"
    :progressColor = "rgba(5, 150, 105, 1)"
    
    return progressColor;
}
