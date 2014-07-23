# jQuery Plugin - Spot Effect

## Example

![Spot Effect](/images/example.jpg)

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
        spot_alpha: 1,
        spot_switch: false
    });
```

# Detailed description

## Options

### radius

Defines initial size of spot in pixel.

### gradient

Defines in pixel the gradient of the spot.

### spot_color

Defines the color of spot and overlay.

### spot_alpha

Defines the opacity of the spot.

### spot_switch

If enabled customer can click on spot and it will disappear directly.

## Methods

### spotOn(milliseconds)

Starts an animation of increasing spot size till the hole selected area is visible.

**milliseconds**

The time between start and end of animation in milliseconds.