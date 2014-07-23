# jQuery Plugin - Spot Effect

## Example

![Spot Effect](/images/example.png)

## Usage

1. Download the jquery.Spot.js file --> /js/jquery.Spot.js
2. Place the file in your project and load it as common
3. Select the area to spotify ```$('YOUR_SELECTOR').Spot()```

Example:
```
$(function() {
    $('#container').Spot({
        radius: 100,
        gradient: 1,
        spot_color: '#7a6b67',
        spot_alpha: 1
    });
```

# Detailed description

## Options

### radius

Defines initial size of spot in pixel.

### gradient

Defines the gradient of the spot in percentage.

### color

Defines the color of spot and overlay.

### alpha

Defines the alpha level of spot.

### mouseEnabled

If true Spot will follow mousemove on element.

## Methods

### spotOn(milliseconds)

Starts an animation of increasing spot size till the hole selected area is visible.

**milliseconds**

The time between start and end of animation in milliseconds.