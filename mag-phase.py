import numpy as np
from numpy import pi, log10
import matplotlib.pyplot as plt
from scipy import signal

### l array bta3na mn l js array of arrays [[real1,imag1], [real2,imag2], .....] ###

# zeros and poles entered by user.
z = np.array([0.1+0.3j, -0.1+0.4j, 0+2j,2+0j])
p = np.array([-0.1+0.5j, 0.56-0.3j, 3+0j,0+3j])

def draw(zerosArray , polesArray):
    # gain, to calculate it you must follow some steps that's not provided in this file.
    #Assume we have gain = 1
    gain = 1
    
    zero, pole = signal.zpk2tf(zerosArray, polesArray, gain)
    
    #Frequency response using freqz
    w, h = signal.freqz(zero, pole)
    
    #plot mag response
    plt.plot(w/pi, 20*log10(abs(h)))
    #plot phase response
    plt.plot(w/pi, 180/pi * np.unwrap(np.angle(h)))
    # plt.xscale('log')
    plt.title('Frequency response')
    plt.legend(["Magnitude response", "Phase response"])
    # plt.xlim([0, 0.5])
    plt.show()
    
    return w , h

if __name__ == "__main__":
    w, h = draw(z,p)
