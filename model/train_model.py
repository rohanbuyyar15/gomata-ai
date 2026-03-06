import tensorflow as tf
from tensorflow.keras import layers, models

def build_model(num_classes):
    """
    Builds a transfer learning model using MobileNetV2.
    """
    base_model = tf.keras.applications.MobileNetV2(
        input_shape=(224, 224, 3),
        include_top=False,
        weights='imagenet'
    )
    base_model.trainable = False

    model = models.Sequential([
        base_model,
        layers.GlobalAveragePooling2D(),
        layers.Dense(128, activation='relu'),
        layers.Dropout(0.2),
        layers.Dense(num_classes, activation='softmax')
    ])

    model.compile(
        optimizer='adam',
        loss='sparse_categorical_crossentropy',
        metrics=['accuracy']
    )
    
    return model

if __name__ == "__main__":
    print("Conceptual training script loaded.")
    # Example usage:
    # model = build_model(num_classes=9)
    # model.summary()
