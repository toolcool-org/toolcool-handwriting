import * as tf from '@tensorflow/tfjs';

const trainModel = async () : Promise<tf.Sequential> => {

    // define an empty model for linear regression
    const linearModel = tf.sequential();

    // dense layer = fully connected layer
    // it will output a shape of 1 (units: 1)
    // it will input a shape of 1 (inputShape: [1])
    linearModel.add(
        tf.layers.dense({
            units: 1,
            inputShape: [1],
        })
    );

    // prepare the model for training:
    // specify the loss and the optimizer
    linearModel.compile({
        loss: 'meanSquaredError',
        optimizer: 'sgd', // stochastic gradient descent
    });

    // create training data, completely random - in a form of a tensor;
    // tensor = array
    // xs = feature data
    // ys = label data
    const xs = tf.tensor1d([1, 5, 2, 7, 4, 12, 0, -8, 100, 1]); // one-dimensional tensor = array of numbers
    const ys = tf.tensor1d([-155, 9, 4, 18, 6, 4, 12, 6, 20, 5]);

    // train the model
    await linearModel.fit(xs, ys);

    return linearModel;
};

const predict = (val: number, linearModel: tf.Sequential) => {

    const prediction = linearModel.predict(
        tf.tensor2d(
            [val],
            [1, 1],
        )
    ) as tf.Tensor;

    const out = Array.from(prediction.dataSync());

    return out[0];
};

const handwriting = async () => {
    const model = await trainModel();
    return predict(4, model);

    /*
    // https://www.tensorflow.org/js/guide/save_load
    // return await tf.loadModel('./assets/model.json');
    const model = await tf.loadLayersModel('./assets/model.json')

    await tf.tidy(() => {

        const imageData: ImageData = null; // load image data from canvas

        // Convert the canvas pixels to a Tensor of the matching shape
        let img = tf.browser.fromPixels(imageData, 1);
        img = img.reshape([1, 28, 28, 1]);
        img = tf.cast(img, 'float32');

        // Make and format the predications
        const output = model.predict(img) as tf.Tensor;

        // Save predictions on the component
        const predictions = Array.from(output.dataSync());
        console.log('predictions', predictions);
    });

    return 1;*/
};

export default handwriting;