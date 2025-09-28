#!/usr/bin/env python3
"""
Load testing script for Flask app to trigger autoscaling
"""
import requests
import threading
import time
import argparse
from concurrent.futures import ThreadPoolExecutor

def make_request(url, session):
    """Make a single request to the Flask app"""
    try:
        response = session.get(url, timeout=10)
        print(f"Status: {response.status_code}, Response time: {response.elapsed.total_seconds():.2f}s")
        return response.status_code
    except Exception as e:
        print(f"Error: {e}")
        return None

def make_cpu_intensive_request(url, session):
    """Make a request that includes CPU-intensive operations"""
    try:
        # First make the normal request
        response = session.get(url, timeout=10)
        
        # Then do some CPU-intensive work to simulate a heavy workload
        # This simulates what would happen if your Flask app was doing heavy processing
        import hashlib
        import random
        
        # Generate some CPU load
        for _ in range(1000):
            data = str(random.random() * 1000000).encode()
            hashlib.sha256(data).hexdigest()
        
        print(f"Status: {response.status_code}, Response time: {response.elapsed.total_seconds():.2f}s [CPU-intensive]")
        return response.status_code
    except Exception as e:
        print(f"Error: {e}")
        return None

def load_test(url, num_threads=10, duration=300, requests_per_second=5):
    """
    Generate load on the Flask app
    
    Args:
        url: Your ALB URL
        num_threads: Number of concurrent threads
        duration: How long to run the test (seconds)
        requests_per_second: Target requests per second per thread
    """
    print(f"Starting load test:")
    print(f"URL: {url}")
    print(f"Threads: {num_threads}")
    print(f"Duration: {duration} seconds")
    print(f"Target RPS per thread: {requests_per_second}")
    print("-" * 50)
    
    session = requests.Session()
    start_time = time.time()
    
    def worker():
        while time.time() - start_time < duration:
            make_cpu_intensive_request(url, session)
            time.sleep(1 / requests_per_second)  # Control request rate
    
    # Start multiple threads
    with ThreadPoolExecutor(max_workers=num_threads) as executor:
        futures = [executor.submit(worker) for _ in range(num_threads)]
        
        # Wait for all threads to complete
        for future in futures:
            future.result()
    
    print(f"\nLoad test completed after {duration} seconds")

if __name__ == "__main__":
    # Default ALB URL
    DEFAULT_URL = "http://follicle-force-1-1793883685.us-east-1.elb.amazonaws.com"
    
    parser = argparse.ArgumentParser(description="Load test Flask app")
    parser.add_argument("url", nargs='?', default=DEFAULT_URL, help=f"ALB URL (default: {DEFAULT_URL})")
    parser.add_argument("--threads", type=int, default=20, help="Number of threads")
    parser.add_argument("--duration", type=int, default=300, help="Duration in seconds")
    parser.add_argument("--rps", type=int, default=10, help="Requests per second per thread")
    
    args = parser.parse_args()
    
    load_test(args.url, args.threads, args.duration, args.rps)
